import { spawn } from 'node:child_process';

const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: '1',
  NEXT_PRIVATE_BUILD_WORKER: '1',
};

const child = spawn(
  process.platform === 'win32'
    ? process.env.COMSPEC || 'cmd.exe'
    : 'npx',
  process.platform === 'win32' ? ['/d', '/s', '/c', 'npx next build'] : ['next', 'build'],
  { stdio: 'inherit', env, shell: false },
);

const timeoutMs = Number(process.env.AETHER_BUILD_TIMEOUT_MS ?? 300000);
const timer = setTimeout(() => {
  console.error(`Aether build timed out after ${timeoutMs}ms`);
  child.kill('SIGTERM');
}, timeoutMs);

let finished = false;
function finish(code, signal) {
  if (finished) return;
  finished = true;
  clearTimeout(timer);
  if (signal) {
    console.error(`Aether build stopped by signal: ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 1);
}

child.on('error', (error) => {
  clearTimeout(timer);
  console.error(`Aether build failed to start: ${error.message}`);
  process.exit(1);
});
child.on('exit', finish);
child.on('close', finish);
