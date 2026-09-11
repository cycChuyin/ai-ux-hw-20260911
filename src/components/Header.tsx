import React from 'react';
import { TabId } from '../types';
import { 
  Sparkles, 
  Network, 
  LayoutTemplate, 
  GitCommit, 
  Smartphone,
  Box,
  ChevronRight,
  Menu,
  X
} from './Icons';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const steps: { id: TabId; stepNum: string; label: string; subLabel: string; icon: React.ElementType }[] = [
  { id: 'overview', stepNum: '01', label: '專案概覽', subLabel: 'Overview', icon: Sparkles },
  { id: 'functional-map', stepNum: '02', label: '功能地圖', subLabel: 'Functional Map', icon: Network },
  { id: 'wireframe', stepNum: '03', label: '介面線框稿', subLabel: 'Wireframe', icon: LayoutTemplate },
  { id: 'user-flow', stepNum: '04', label: '使用者流程', subLabel: 'User Flow', icon: GitCommit },
  { id: 'prototype', stepNum: '05', label: '互動原型', subLabel: 'Prototype', icon: Smartphone },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectTab('overview')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg md:text-xl tracking-tight text-white">SmartStock</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Case Study
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">智慧物品庫存 APP ｜ 產品發想與設計歷程展示</p>
            </div>
          </div>

          {/* Desktop Stepper Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeTab === step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => onSelectTab(step.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-black/20 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {step.stepNum}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span>{step.label}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 mx-0.5" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onSelectTab('prototype')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-500 text-white flex items-center gap-1 shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>操作 Prototype</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="選單"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-6 space-y-1">
          <p className="text-xs font-semibold text-slate-400 px-3 py-2 uppercase tracking-wider">專案設計階段</p>
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectTab(step.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.stepNum}
                  </span>
                  <Icon className="w-4 h-4" />
                  <span>{step.label}</span>
                </div>
                <span className="text-xs opacity-75">{step.subLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
