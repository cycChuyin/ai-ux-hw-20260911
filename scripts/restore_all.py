vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
"""

index_css = """@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans TC', sans-serif;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
"""

app_tsx = """import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import { Header } from './components/Header';
import { FooterNav } from './components/FooterNav';
import { Overview } from './pages/Overview';
import { FunctionalMap } from './pages/FunctionalMap';
import { Wireframe } from './pages/Wireframe';
import { UserFlow } from './pages/UserFlow';
import { Prototype } from './pages/Prototype';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const hash = window.location.hash.replace('#', '') as TabId;
    const validTabs: TabId[] = ['overview', 'functional-map', 'wireframe', 'user-flow', 'prototype'];
    return validTabs.includes(hash) ? hash : 'overview';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId;
      const validTabs: TabId[] = ['overview', 'functional-map', 'wireframe', 'user-flow', 'prototype'];
      if (validTabs.includes(hash) && hash !== activeTab) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Header activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main className="flex-1">
        {activeTab === 'overview' && <Overview onNavigateTab={handleSelectTab} />}
        {activeTab === 'functional-map' && <FunctionalMap onNavigateTab={handleSelectTab} />}
        {activeTab === 'wireframe' && <Wireframe onNavigateTab={handleSelectTab} />}
        {activeTab === 'user-flow' && <UserFlow onNavigateTab={handleSelectTab} />}
        {activeTab === 'prototype' && <Prototype onNavigateTab={handleSelectTab} />}
      </main>

      <FooterNav currentTab={activeTab} onSelectTab={handleSelectTab} />
    </div>
  );
};

export default App;
"""

with open('vite.config.ts', 'w', encoding='utf-8') as f:
    f.write(vite_config)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(index_css)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_tsx)

print("Files restored successfully")
