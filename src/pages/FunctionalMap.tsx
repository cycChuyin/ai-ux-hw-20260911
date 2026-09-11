import React, { useState } from 'react';
import { TabId, PriorityLevel, FunctionalNode } from '../types';
import { functionalModules } from '../data/functionalMapData';
import { NodeDetailDrawer } from '../components/NodeDetailDrawer';
import { 
  Network, 
  Home, 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  BellRing, 
  ShoppingCart, 
  Settings, 
  Filter, 
  Layers, 
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  ExternalLink
} from '../components/Icons';

interface FunctionalMapProps {
  onNavigateTab: (tab: TabId) => void;
}

export const FunctionalMap: React.FC<FunctionalMapProps> = ({ onNavigateTab }) => {
  const [activePriority, setActivePriority] = useState<PriorityLevel | 'ALL'>('ALL');
  const [selectedNode, setSelectedNode] = useState<{ node: FunctionalNode; moduleName: string } | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'cards'>('tree');

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5 text-indigo-500" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-5 h-5 text-orange-500" />;
      case 'Package': return <Package className="w-5 h-5 text-blue-500" />;
      case 'PlusCircle': return <PlusCircle className="w-5 h-5 text-emerald-500" />;
      case 'BellRing': return <BellRing className="w-5 h-5 text-amber-500" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-rose-500" />;
      case 'Settings': return <Settings className="w-5 h-5 text-slate-500" />;
      default: return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  // Calculate statistics
  const allNodes = functionalModules.flatMap((m) => m.nodes);
  const mvpCount = allNodes.filter((n) => n.priority === 'MVP').length;
  const p1Count = allNodes.filter((n) => n.priority === 'P1').length;
  const p2Count = allNodes.filter((n) => n.priority === 'P2').length;

  const priorityBadges = {
    MVP: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    P1: 'bg-sky-100 text-sky-800 border-sky-300',
    P2: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold uppercase tracking-wider mb-3">
            <Network className="w-3.5 h-3.5" />
            Step 02 ・ 資訊架構與功能分級
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            功能地圖 (Functional Map)
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            系統性地將使用者痛點轉化為 7 大功能模組與 28 個功能節點，並依照 MVP（第一版核心）、P1（效率提升）、P2（智慧化功能）建立三階段產品演進藍圖。
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tree' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>樹狀階層視圖</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>模組卡片視圖</span>
          </button>
        </div>
      </div>

      {/* Priority Filter Bar & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Priority Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> 優先級過濾：
          </span>
          <button
            onClick={() => setActivePriority('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePriority === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            全部 ({allNodes.length})
          </button>
          <button
            onClick={() => setActivePriority('MVP')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePriority === 'MVP'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            MVP 必要功能 ({mvpCount})
          </button>
          <button
            onClick={() => setActivePriority('P1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePriority === 'P1'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-50'
            }`}
          >
            P1 提升效率 ({p1Count})
          </button>
          <button
            onClick={() => setActivePriority('P2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePriority === 'P2'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            P2 智慧化功能 ({p2Count})
          </button>
        </div>

        {/* Legend / Tip */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-orange-500" />
          <span>點擊任意功能節點可展開規格詳情與解決痛點</span>
        </div>
      </div>

      {/* Main Functional Modules Render */}
      {viewMode === 'tree' ? (
        /* Hierarchical Tree View */
        <div className="space-y-6">
          {functionalModules.map((module) => {
            const filteredNodes = module.nodes.filter(
              (n) => activePriority === 'ALL' || n.priority === activePriority
            );
            if (filteredNodes.length === 0) return null;

            return (
              <div 
                key={module.id} 
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
              >
                {/* Module Header Bar */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-200">
                      {getModuleIcon(module.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{module.name}</h3>
                      <p className="text-xs text-slate-500">{module.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
                    {filteredNodes.length} 項功能
                  </span>
                </div>

                {/* Tree Nodes List */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredNodes.map((node) => (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode({ node, moduleName: module.name })}
                      className="group p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-orange-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-bold text-sm text-slate-800 group-hover:text-orange-600 transition-colors">
                            {node.name}
                          </span>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${priorityBadges[node.priority]}`}>
                            {node.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {node.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-orange-500">
                        <span className="truncate max-w-[180px]">痛點：{node.targetPainPoint}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Card Matrix View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalModules.map((module) => {
            const filteredNodes = module.nodes.filter(
              (n) => activePriority === 'ALL' || n.priority === activePriority
            );
            if (filteredNodes.length === 0) return null;

            return (
              <div 
                key={module.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-orange-50 border border-orange-100">
                      {getModuleIcon(module.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{module.name}</h3>
                      <span className="text-[11px] text-slate-400">{filteredNodes.length} 項規劃</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{module.description}</p>

                  <div className="space-y-2">
                    {filteredNodes.map((node) => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode({ node, moduleName: module.name })}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-orange-300 hover:bg-orange-50/30 transition-all cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-slate-700">{node.name}</span>
                        <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded border ${priorityBadges[node.priority]}`}>
                          {node.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Node Detail Drawer Modal */}
      <NodeDetailDrawer
        node={selectedNode?.node || null}
        moduleName={selectedNode?.moduleName || ''}
        onClose={() => setSelectedNode(null)}
        onNavigateToWireframe={() => onNavigateTab('wireframe')}
      />
    </div>
  );
};
