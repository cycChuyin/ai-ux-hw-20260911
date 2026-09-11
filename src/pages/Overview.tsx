import React from 'react';
import { TabId } from '../types';
import { 
  productInfo, 
  personas, 
  painPointSolutions, 
  designJourneySteps 
} from '../data/overviewData';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  ShoppingBag, 
  Compass, 
  Network, 
  LayoutTemplate, 
  GitCommit, 
  Smartphone,
  Quote,
  ShieldCheck,
  Zap,
  Repeat
} from '../components/Icons';

interface OverviewProps {
  onNavigateTab: (tab: TabId) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigateTab }) => {
  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-orange-500" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-amber-500" />;
      case 'Compass': return <Compass className="w-6 h-6 text-rose-500" />;
      default: return <Users className="w-6 h-6 text-orange-500" />;
    }
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-orange-500" />;
      case 'Network': return <Network className="w-5 h-5 text-indigo-500" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-5 h-5 text-blue-500" />;
      case 'GitCommit': return <GitCommit className="w-5 h-5 text-emerald-500" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-purple-500" />;
      default: return <Sparkles className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-16 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Hero Section: High Contrast Narrative */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-700/60 shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI x UX 產品設計案例展示 (Case Study)
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            智慧物品庫存 APP
            <span className="block text-xl sm:text-2xl font-medium text-slate-300 mt-2">
              告別過期浪費與重複採買・都市小資家庭的智慧收納與庫存管家
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            {productInfo.statement}
          </p>

          {/* Design Challenge & Goal Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <Target className="w-4 h-4" />
                設計挑戰 (Design Challenge)
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {productInfo.challenge}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                設計目標 (Design Goal)
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {productInfo.goal}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigateTab('functional-map')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>檢視功能地圖 (Step 02)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('prototype')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-orange-400" />
              <span>直接操作 Prototype 原型</span>
            </button>
          </div>
        </div>

        {/* 4 Core Loop Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {productInfo.coreLoop.map((loop) => (
            <div key={loop.step} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs font-mono text-orange-400 font-bold block mb-1">{loop.step}</span>
              <h4 className="text-sm font-bold text-white mb-1">{loop.title}</h4>
              <p className="text-xs text-slate-400">{loop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Target Personas Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">Target Audience</span>
            <h2 className="text-2xl font-bold text-slate-900">目標使用者族群與情境</h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            深入洞察居住於空間有限都市的現代小資家庭，聚焦收納困難、促銷囤貨與出國採買之真實情境。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div 
              key={persona.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    {getPersonaIcon(persona.avatarIcon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{persona.name}</h3>
                    <p className="text-xs text-orange-600 font-medium">{persona.role}</p>
                  </div>
                </div>

                <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div><span className="font-semibold text-slate-700">家庭結構：</span>{persona.familyType}</div>
                  <div><span className="font-semibold text-slate-700">居住空間：</span>{persona.housing}</div>
                </div>

                {/* Habits */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">生活習性與行為</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {persona.habits.map((habit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span>{habit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pain points */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">核心遭遇痛點</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {persona.painPoints.map((pp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{pp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs italic text-slate-500 relative pl-4">
                  <Quote className="w-3 h-3 text-orange-400 absolute left-0 top-0 opacity-60" />
                  {persona.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points vs Solutions Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">Problem & Solution</span>
            <h2 className="text-2xl font-bold text-slate-900">痛點與對應產品解決方案矩陣</h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            將 6 大生活痛點逐一映射至 APP 具體功能模組，確保每一項功能規劃皆有所本。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPointSolutions.map((item, idx) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-orange-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center font-mono">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.painPoint}</h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium whitespace-nowrap">
                  {item.featureModule}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100/80 text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                  <div>
                    <span className="font-semibold">日常影響：</span>
                    <span>{item.impact}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 text-emerald-800 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">APP 解決方式：</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Journey Roadmap */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">Process Roadmap</span>
            <h2 className="text-2xl font-bold text-slate-900">產品設計產出旅程</h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            點擊下方任一階段，探索由概念構思逐步成形為高保真互動原型的完整歷程。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {designJourneySteps.map((step) => (
            <div
              key={step.id}
              onClick={() => onNavigateTab(step.id as TabId)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-orange-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold font-mono text-orange-500 group-hover:scale-110 transition-transform">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-orange-50 border border-slate-100 group-hover:border-orange-200 transition-colors">
                    {getStepIcon(step.icon)}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-orange-600">
                <span>檢視此章節</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
