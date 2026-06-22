import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, '..');
const repoRoot = resolve(appRoot, '..');
const srcDir = join(repoRoot, 'data', 'seeds');
const outDir = join(appRoot, 'data');

if (!existsSync(srcDir)) {
  throw new Error(`Missing seed directory: ${srcDir}`);
}
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((name) => name.endsWith('.json'));
for (const file of files) {
  copyFileSync(join(srcDir, file), join(outDir, file));
  console.log(`synced ${file}`);
}
console.log(`OK: synced ${files.length} seed JSON files into next-app/data`);
