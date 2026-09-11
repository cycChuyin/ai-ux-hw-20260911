import os

def write_file(filepath, content):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {filepath}")

header_content = """import React from 'react';
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
} from 'lucide-react';

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
"""

footer_nav_content = """import React from 'react';
import { TabId } from '../types';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface FooterNavProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const tabOrder: { id: TabId; name: string; step: string }[] = [
  { id: 'overview', name: '專案概覽 Overview', step: '01' },
  { id: 'functional-map', name: '功能地圖 Functional Map', step: '02' },
  { id: 'wireframe', name: '介面線框稿 Wireframe', step: '03' },
  { id: 'user-flow', name: '使用者流程 User Flow', step: '04' },
  { id: 'prototype', name: '互動原型 Prototype', step: '05' },
];

export const FooterNav: React.FC<FooterNavProps> = ({ currentTab, onSelectTab }) => {
  const currentIndex = tabOrder.findIndex((t) => t.id === currentTab);
  const prevTab = currentIndex > 0 ? tabOrder[currentIndex - 1] : null;
  const nextTab = currentIndex < tabOrder.length - 1 ? tabOrder[currentIndex + 1] : null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80 backdrop-blur py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Previous Tab */}
        <div className="w-full md:w-auto">
          {prevTab ? (
            <button
              onClick={() => {
                onSelectTab(prevTab.id);
                scrollToTop();
              }}
              className="w-full md:w-auto flex items-center justify-center md:justify-start gap-3 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-400 hover:shadow-md transition-all group text-left"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-xs text-slate-400 block font-mono">上一階段 (Step {prevTab.step})</span>
                <span className="text-sm font-semibold text-slate-800">{prevTab.name}</span>
              </div>
            </button>
          ) : (
            <div className="hidden md:block w-36" />
          )}
        </div>

        {/* Step Indicator & Back to top */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {tabOrder.map((t, idx) => (
              <div
                key={t.id}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-orange-500'
                    : idx < currentIndex
                    ? 'w-2 bg-slate-400'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Step {currentIndex + 1} of {tabOrder.length}
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors mt-1"
          >
            <ArrowUp className="w-3 h-3" /> 回到頂部
          </button>
        </div>

        {/* Next Tab */}
        <div className="w-full md:w-auto">
          {nextTab ? (
            <button
              onClick={() => {
                onSelectTab(nextTab.id);
                scrollToTop();
              }}
              className="w-full md:w-auto flex items-center justify-center md:justify-end gap-3 px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-orange-600 shadow-md hover:shadow-orange-500/25 transition-all group text-right cursor-pointer"
            >
              <div>
                <span className="text-xs text-orange-300 block font-mono">下一階段 (Step {nextTab.step})</span>
                <span className="text-sm font-semibold">{nextTab.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => {
                onSelectTab('overview');
                scrollToTop();
              }}
              className="w-full md:w-auto flex items-center justify-center md:justify-end gap-3 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <span className="text-sm font-semibold">重新回顧專案概覽</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
"""

drawer_content = """import React from 'react';
import { FunctionalNode } from '../types';
import { X, CheckCircle2, ShieldAlert, Sparkles, Tag, ArrowRight } from 'lucide-react';

interface NodeDetailDrawerProps {
  node: FunctionalNode | null;
  moduleName: string;
  onClose: () => void;
  onNavigateToWireframe?: () => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  node,
  moduleName,
  onClose,
  onNavigateToWireframe,
}) => {
  if (!node) return null;

  const priorityColors = {
    MVP: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    P1: 'bg-sky-50 text-sky-700 border-sky-300',
    P2: 'bg-purple-50 text-purple-700 border-purple-300',
  };

  const priorityLabels = {
    MVP: 'MVP 必要核心',
    P1: 'P1 效率提升',
    P2: 'P2 智慧化功能',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {moduleName}
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{node.name}</h3>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${priorityColors[node.priority]}`}>
                {priorityLabels[node.priority]}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              功能描述與目標
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {node.description}
            </p>
          </div>

          {/* Addressed Pain Point */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              鎖定解決之使用者痛點
            </h4>
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 text-rose-800 text-sm flex items-start gap-2">
              <Tag className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span className="font-medium">{node.targetPainPoint}</span>
            </div>
          </div>

          {/* Feature Specs */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              功能細節規格 (Specs)
            </h4>
            <ul className="space-y-2.5">
              {node.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            關閉
          </button>
          {onNavigateToWireframe && (
            <button
              onClick={() => {
                onClose();
                onNavigateToWireframe();
              }}
              className="px-4 py-2 text-sm font-medium rounded-xl bg-orange-500 text-white hover:bg-orange-600 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>查看對應 Wireframe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
"""

write_file('src/components/Header.tsx', header_content)
write_file('src/components/FooterNav.tsx', footer_nav_content)
write_file('src/components/NodeDetailDrawer.tsx', drawer_content)
print("Part 1 components successfully written.")
