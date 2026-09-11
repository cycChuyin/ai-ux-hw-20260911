import os

with open('src/vite-env.d.ts', 'a', encoding='utf-8') as f:
    f.write("""
declare module 'lucide-react/dist/esm/icons/*.mjs' {
  import React from 'react';
  const Component: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string; color?: string; strokeWidth?: number | string }>;
  export default Component;
}
""")
print("vite-env.d.ts updated")

with open('src/components/Icons.tsx', 'a', encoding='utf-8') as f:
    f.write("""export { default as Zap } from 'lucide-react/dist/esm/icons/zap.mjs';
export { default as Repeat } from 'lucide-react/dist/esm/icons/repeat.mjs';
export { default as Code } from 'lucide-react/dist/esm/icons/code.mjs';
export { default as Eye } from 'lucide-react/dist/esm/icons/eye.mjs';
""")
print("Icons.tsx updated with Zap, Repeat, Code, Eye")
