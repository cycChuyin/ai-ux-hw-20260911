import React from 'react';
import { FunctionalNode } from '../types';
import { X, CheckCircle2, ShieldAlert, Sparkles, Tag, ArrowRight } from './Icons';

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
