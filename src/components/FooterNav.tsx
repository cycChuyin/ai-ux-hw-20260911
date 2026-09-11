import React from 'react';
import { TabId } from '../types';
import { ArrowLeft, ArrowRight, ArrowUp } from './Icons';

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
