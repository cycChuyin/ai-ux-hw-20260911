import subprocess

vite_conf = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
"""

with open("vite.config.ts", "w", encoding="utf-8") as f:
    f.write(vite_conf)

minimal = """import React from 'react';
export const App: React.FC = () => <div>Hello World</div>;
export default App;
"""
with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(minimal)

res = subprocess.run(["npx.cmd", "vite", "build"], shell=True)
print("Return code:", res.returncode)
