import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('1. Running TypeScript check...');
execSync('npx tsc -b', { stdio: 'inherit' });

console.log('2. Bundling with esbuild...');
execSync('npx esbuild src/main.tsx --bundle --minify --outfile=dist/assets/index.js --loader:.tsx=tsx --loader:.ts=ts --loader:.css=css', { stdio: 'inherit' });

console.log('3. Generating dist/index.html...');
let html = fs.readFileSync('index.html', 'utf8');
// Replace dev script with production bundle
html = html.replace(
  '<script type="module" src="/src/main.tsx"></script>',
  '<link rel="stylesheet" href="./assets/index.css" />\n    <script type="module" src="./assets/index.js"></script>'
);
html = html.replace('<title>ai-x-ux--20260911hw</title>', '<title>SmartStock 智慧物品庫存 APP ｜ 產品發想與設計歷程展示</title>');
fs.writeFileSync('dist/index.html', html, 'utf8');

console.log('Build completed successfully in dist/ !');
