#!/usr/bin/env node
/**
 * Aether Radar MCP Prototype
 *
 * Minimal stdio JSON-RPC server with MCP-style initialize/tools/list/tools/call methods.
 * It has no external dependencies and reads the project seed data directly.
 *
 * This is a prototype for local agent integration. Before enterprise use, add auth,
 * rate limiting, audit logs, signed data snapshots and permission scoping.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
const entities = readJson('data/seeds/entities.json');
const categories = readJson('data/seeds/categories.json');
const risks = readJson('data/seeds/risk_taxonomy.json');
const scenarios = readJson('data/seeds/scenarios.json');

const categoryName = (id) => categories.find((item) => item.id === id)?.name ?? id;
const heatScore = { SSS: 6, SS: 5, S: 4, A: 3, B: 2, C: 1, 待核验: 0, 无需热度: 0 };
const riskScore = { 高: 3, 中: 2, 低: 1, 未知: 0 };

function compactEntity(entity) {
  return {
    id: entity.id,
    name: entity.name,
    cn: entity.cn,
    literal: entity.literal,
    category: entity.category,
    categoryName: categoryName(entity.category),
    type: entity.type,
    summary: entity.summary,
    url: entity.url,
    githubRepo: entity.githubRepo,
    heatLevel: entity.heatLevel,
    riskLevel: entity.riskLevel,
    riskNote: entity.riskNote,
    openSource: entity.openSource,
    localDeploy: entity.localDeploy,
    chinaUsability: entity.chinaUsability,
    license: entity.license,
    commercialUse: entity.commercialUse,
    apiSupport: entity.apiSupport,
    mcpSupport: entity.mcpSupport,
    sourceConfidence: entity.sourceConfidence,
    lastVerifiedAt: entity.lastVerifiedAt,
  };
}

function searchEntities(args = {}) {
  const query = String(args.query ?? '').trim().toLowerCase();
  const limit = Math.min(Math.max(Number(args.limit ?? 10), 1), 50);
  const category = args.category ?? 'all';
  const risk = args.risk ?? 'all';
  const rows = entities.filter((entity) => {
    const haystack = [entity.name, entity.literal, entity.cn, entity.summary, entity.value, entity.category, entity.type, entity.githubRepo, entity.riskNote, entity.recommendedFor].join(' ').toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (category !== 'all' && entity.category !== category) return false;
    if (risk !== 'all' && entity.riskLevel !== risk) return false;
    if (args.openSource === true && !entity.openSource) return false;
    if (args.localDeploy === true && !entity.localDeploy) return false;
    return true;
  }).sort((a, b) => (heatScore[b.heatLevel] ?? 0) - (heatScore[a.heatLevel] ?? 0) || (riskScore[a.riskLevel] ?? 0) - (riskScore[b.riskLevel] ?? 0));
  return rows.slice(0, limit).map(compactEntity);
}

function getEntity(args = {}) {
  const id = String(args.id ?? '').trim();
  const row = entities.find((entity) => entity.id === id || entity.name.toLowerCase() === id.toLowerCase());
  if (!row) return null;
  return compactEntity(row);
}

const tools = [
  {
    name: 'search_entities',
    description: 'Search AI tools, platforms, models, agents, open-source projects and risk entries.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string' },
        risk: { type: 'string', enum: ['all', '低', '中', '高', '未知'] },
        openSource: { type: 'boolean' },
        localDeploy: { type: 'boolean' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'get_entity',
    description: 'Get one Aether Radar entity by id or exact name.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  },
  {
    name: 'list_categories',
    description: 'List AI ecosystem categories.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_risks',
    description: 'List risk dimensions and risk descriptions.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_scenarios',
    description: 'List scenario-based AI tool stack recommendations.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'data_status',
    description: 'Return counts and data quality warnings.',
    inputSchema: { type: 'object', properties: {} },
  },
];

function callTool(name, args) {
  if (name === 'search_entities') return searchEntities(args);
  if (name === 'get_entity') return getEntity(args);
  if (name === 'list_categories') return categories;
  if (name === 'list_risks') return risks;
  if (name === 'list_scenarios') return scenarios;
  if (name === 'data_status') return {
    version: '3.1',
    entities: entities.length,
    categories: categories.length,
    risks: risks.length,
    scenarios: scenarios.length,
    githubEntities: entities.filter((entity) => entity.githubRepo).length,
    warnings: [
      'Seed data snapshot only; verify official sources before commercial use.',
      'Stars/Forks are popularity signals, not quality or safety guarantees.',
      'Review privacy, copyright, license, commercial terms and local laws before deployment.',
    ],
  };
  throw new Error(`Unknown tool: ${name}`);
}

function send(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`);
}

function ok(id, result) { send({ jsonrpc: '2.0', id, result }); }
function fail(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

function handle(message) {
  try {
    if (message.method === 'initialize') {
      ok(message.id, {
        protocolVersion: '2024-11-05',
        serverInfo: { name: 'aether-radar-mcp', version: '3.1.0' },
        capabilities: { tools: {} },
      });
      return;
    }
    if (message.method === 'tools/list') {
      ok(message.id, { tools });
      return;
    }
    if (message.method === 'tools/call') {
      const name = message.params?.name;
      const args = message.params?.arguments ?? {};
      const result = callTool(name, args);
      ok(message.id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
      return;
    }
    if (message.method === 'ping') {
      ok(message.id, {});
      return;
    }
    if (message.id !== undefined) fail(message.id, -32601, `Method not found: ${message.method}`);
  } catch (error) {
    fail(message.id, -32000, error instanceof Error ? error.message : String(error));
  }
}

let buffer = Buffer.alloc(0);
process.stdin.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (true) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;
    const header = buffer.slice(0, headerEnd).toString('utf8');
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const length = Number(match[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (buffer.length < bodyEnd) break;
    const body = buffer.slice(bodyStart, bodyEnd).toString('utf8');
    buffer = buffer.slice(bodyEnd);
    handle(JSON.parse(body));
  }
});
