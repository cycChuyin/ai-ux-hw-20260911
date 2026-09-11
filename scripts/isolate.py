import subprocess
import os

with open("src/App.tsx", "r", encoding="utf-8") as f:
    orig = f.read()

# Test with minimal App.tsx
minimal = """import React from 'react';
export const App: React.FC = () => <div>Hello World</div>;
export default App;
"""

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(minimal)

res = subprocess.run(["npx.cmd", "vite", "build"], capture_output=True, text=True)
print("Minimal App build status:", res.returncode)
print(res.stdout)
print(res.stderr)

# Restore
with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(orig)
