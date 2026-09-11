import React, { useState } from 'react';
import { TabId } from '../types';
import { userFlowTasks, exceptionCases } from '../data/userFlowData';
import { 
  GitCommit, 
  ShieldAlert, 
  Smartphone, 
  ChevronDown,
  ChevronUp
} from '../components/Icons';

interface UserFlowProps {
  onNavigateTab: (tab: TabId) => void;
}

export const UserFlow: React.FC<UserFlowProps> = ({ onNavigateTab }) => {
  const [activeFlowId, setActiveFlowId] = useState<string>('flow-1');
  const [expandedException, setExpandedException] = useState<string | null>('exc-2');

  const currentFlow = userFlowTasks.find((f) => f.id === activeFlowId) || userFlowTasks[0];

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-100 text-rose-700 border border-rose-200">高風險</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-200">中風險</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">一般情境</span>;
    }
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            Step 04 ・ 任務路徑與防呆例外策略
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            使用者流程 (User Flow)
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            串接各個線框稿畫面，聚焦 3 大核心任務的操作路徑、條件決策分支，並深入剖析 7 大例外狀況的防呆防錯 UX 對策。
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('prototype')}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer transition-all"
        >
          <Smartphone className="w-4 h-4" />
          <span>前往體驗互動原型 (Step 05)</span>
        </button>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">Core Tasks</span>
            <h2 className="text-xl font-bold text-slate-900">三大主要操作任務流程</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {userFlowTasks.map((flow) => {
            const isActive = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                onClick={() => setActiveFlowId(flow.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/20'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold block mb-1 uppercase ${
                  isActive ? 'text-orange-400' : 'text-slate-400'
                }`}>
                  {flow.id.toUpperCase()}
                </span>
                <h3 className="font-bold text-sm mb-1">{flow.title}</h3>
                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  isActive ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {flow.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-400 block mb-1">觸發情境 (Trigger)：</span>
              <span className="text-slate-700">{currentFlow.trigger}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 block mb-1">任務成果 (Outcome)：</span>
              <span className="text-emerald-700 font-semibold">{currentFlow.outcome}</span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              操作步驟與決策節點圖 (Step Sequence)
            </span>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-6">
              {currentFlow.steps.map((step) => (
                <div key={step.stepNumber} className="relative group">
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono shadow-xs ${
                    step.isDecision 
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100' 
                      : 'bg-slate-900 text-white'
                  }`}>
                    {step.stepNumber}
                  </div>

                  <div className={`p-4 rounded-2xl border transition-all ${
                    step.isDecision
                      ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600">
                          {step.actor}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {step.action}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">
                        {step.screen}
                      </span>
                    </div>

                    {step.details && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.details}
                      </p>
                    )}

                    {step.branches && (
                      <div className="mt-3 pt-3 border-t border-amber-200/80 space-y-2">
                        <span className="text-[11px] font-bold text-amber-800 block uppercase">
                          ❖ 決策分支判斷 (Decision Branches)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.branches.map((branch, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs">
                              <span className="font-bold text-amber-900 block mb-1">
                                條件：{branch.condition}
                              </span>
                              <span className="text-slate-600 text-[11px] leading-relaxed block">
                                ➔ {branch.target}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-0.5">Edge Cases & Fallbacks</span>
            <h2 className="text-xl font-bold text-slate-900">七大關鍵例外情境與 UX 防呆策略</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            真實家庭情境充滿變數（漏填、離線、誤觸）。針對規格書要求的 7 大邊緣狀況提供容錯防護。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {exceptionCases.map((exc) => {
            const isExpanded = expandedException === exc.id;
            return (
              <div
                key={exc.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedException(isExpanded ? null : exc.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-500">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{exc.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">觸發：{exc.trigger}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {getRiskBadge(exc.riskLevel)}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 space-y-4 animate-fade-in text-xs">
                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        系統即時反應 (System Response)
                      </span>
                      <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                        {exc.systemResponse}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                        UX 設計原則與背後考量 (Design Rationale)
                      </span>
                      <p className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-emerald-900 leading-relaxed">
                        {exc.uxDesignPrinciple}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
