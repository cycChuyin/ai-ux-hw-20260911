import subprocess

files = [
  "src/pages/Overview.tsx",
  "src/pages/FunctionalMap.tsx",
  "src/pages/Wireframe.tsx",
  "src/pages/UserFlow.tsx",
  "src/pages/Prototype.tsx"
]

for f in files:
    test_app = f"""import React from 'react';
import {{ {f.split('/')[-1].replace('.tsx', '')} }} from './pages/{f.split('/')[-1].replace('.tsx', '')}';
export const App = () => <div><p>Testing {f}</p></div>;
export default App;
"""
    with open("src/App.tsx", "w", encoding="utf-8") as app:
        app.write(test_app)
    
    p = subprocess.run(["npx.cmd", "vite", "build"], capture_output=True)
    print(f, "Build code:", p.returncode)
