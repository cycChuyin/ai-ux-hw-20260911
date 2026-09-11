import subprocess

with open("vite.config.ts", "r", encoding="utf-8") as f:
    orig = f.read()

no_tailwind = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
"""
with open("vite.config.ts", "w", encoding="utf-8") as f:
    f.write(no_tailwind)

res = subprocess.run(["npx.cmd", "vite", "build"], capture_output=True, text=True)
print("Return code without tailwind plugin:", res.returncode)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)

with open("vite.config.ts", "w", encoding="utf-8") as f:
    f.write(orig)
