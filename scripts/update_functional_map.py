import os

functional_map_code = """import React, { useState } from 'react';
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
  Info, 
  ChevronRight,
  Workflow,
  ArrowDown,
  ShieldAlert,
  Repeat
} from '../components/Icons';

interface FunctionalMapProps {
  onNavigateTab: (tab: TabId) => void;
}

type ViewMode = 'tree' | 'cards' | 'flowchart';

export const FunctionalMap: React.FC<FunctionalMapProps> = ({ onNavigateTab }) => {
  const [activePriority, setActivePriority] = useState<PriorityLevel | 'ALL'>('ALL');
  const [selectedNode, setSelectedNode] = useState<{ node: FunctionalNode; moduleName: string } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('tree');

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

  // Flowchart Pipeline modules mapping
  const mod1 = functionalModules.find((m) => m.id === 'mod-1')!; // 家庭與空間設定
  const mod2 = functionalModules.find((m) => m.id === 'mod-2')!; // 首頁總覽
  const mod3 = functionalModules.find((m) => m.id === 'mod-3')!; // 物品庫存管理
  const mod4 = functionalModules.find((m) => m.id === 'mod-4')!; // 新增與盤點
  const mod5 = functionalModules.find((m) => m.id === 'mod-5')!; // 期限與庫存提醒
  const mod6 = functionalModules.find((m) => m.id === 'mod-6')!; // 採買與消耗管理
  const mod7 = functionalModules.find((m) => m.id === 'mod-7')!; // 統計與設定

  const flowchartPipeline = [
    {
      step: '01',
      module: mod1,
      flowTitle: '家庭與空間設定',
      flowDesc: '定義實體生活收納容器（冰箱、冷凍庫、乾貨櫃），建立家庭共享空間基礎。',
      connectionLabel: '建立物資管理與日常即時展示基底',
    },
    {
      step: '02',
      module: mod3,
      secondaryModule: mod2,
      flowTitle: '物品庫存管理 ＆ 首頁總覽',
      flowDesc: '家庭核心資產瀏覽與即時狀態儀表板，支援多維搜尋、空間分類與 2x2 關鍵指標。',
      connectionLabel: '採買返家物資建檔 / 條碼與拍照辨識',
    },
    {
      step: '03',
      module: mod4,
      flowTitle: '新增與盤點',
      flowDesc: '極簡手動輸入、批次連續建檔，透過條碼/OCR 降低門檻，並具備即時重複防呆比對。',
      connectionLabel: '觸發時限倒數與安全存量監控機制',
    },
    {
      step: '04',
      module: mod5,
      flowTitle: '期限與庫存提醒',
      flowDesc: '主動式守護機制，到期前 3 天發送推播通知，已過期標記與低庫存警戒。',
      connectionLabel: '缺貨一鍵轉入待買清單，避免重複購買',
    },
    {
      step: '05',
      module: mod6,
      flowTitle: '採買與消耗管理',
      flowDesc: '連動低庫存物品至超市採買清單，結帳完成一鍵回補庫存，食用標記扣減。',
      connectionLabel: '沉澱家庭長期消耗動態與浪費統計',
    },
    {
      step: '06',
      module: mod7,
      flowTitle: '統計與智慧化功能',
      flowDesc: '分析月度囤貨花費與食材浪費率，自訂推播偏好，資料 CSV 備份與匯出。',
      connectionLabel: '採買完成自動回補庫存・完成生活物資管理閉環',
      isEnd: true,
    },
  ];

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

        {/* View Mode Toggle: 3 Modes */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tree' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>樹狀階層視圖</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>模組卡片視圖</span>
          </button>
          <button
            onClick={() => setViewMode('flowchart')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'flowchart' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>流程圖視圖</span>
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

      {/* VIEW 1: Tree View */}
      {viewMode === 'tree' && (
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
      )}

      {/* VIEW 2: Card Matrix View */}
      {viewMode === 'cards' && (
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

      {/* VIEW 3: Flowchart View (Mermaid-style Top-down Architecture) */}
      {viewMode === 'flowchart' && (
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs relative">
          {/* Top Origin Node: User Pain Points */}
          <div className="max-w-2xl mx-auto">
            <div className="p-5 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl border-2 border-rose-300 shadow-sm text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>產品發想起源 ➔ 使用者 6 大核心痛點</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto">
                不知道家中有何物品 ・ 忘記放在哪裡 ・ 放到過期才發現 ・ 忘記而重複購買 ・ 家人無法同步 ・ 逐項輸入繁瑣
              </p>
            </div>

            {/* Connector Arrow 0 */}
            <div className="py-4 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-300" />
              <div className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-semibold text-slate-600 shadow-2xs my-1 flex items-center gap-1">
                <span>推導實體空間收納需求</span>
                <ArrowDown className="w-3 h-3 text-orange-500" />
              </div>
              <div className="w-0.5 h-6 bg-slate-300" />
            </div>
          </div>

          {/* Flowchart Steps Pipeline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {flowchartPipeline.map((stepItem) => {
              const mainModule = stepItem.module;
              const secondaryModule = stepItem.secondaryModule;

              const allPipelineNodes = [
                ...mainModule.nodes,
                ...(secondaryModule ? secondaryModule.nodes : []),
              ];

              const filteredPipelineNodes = allPipelineNodes.filter(
                (n) => activePriority === 'ALL' || n.priority === activePriority
              );

              return (
                <div key={stepItem.step} className="relative">
                  {/* Step Node Card */}
                  <div className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-orange-400 p-5 shadow-sm transition-all">
                    {/* Node Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-orange-500 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                          {stepItem.step}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-slate-100">
                            {getModuleIcon(mainModule.icon)}
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-slate-900">{stepItem.flowTitle}</h3>
                            <span className="text-[11px] text-slate-400 block font-mono">
                              {mainModule.name} {secondaryModule ? `+ ${secondaryModule.name}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Node Priority Stats */}
                      <div className="flex items-center gap-1.5 self-start sm:self-auto">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          MVP: {allPipelineNodes.filter((n) => n.priority === 'MVP').length}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                          P1: {allPipelineNodes.filter((n) => n.priority === 'P1').length}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          P2: {allPipelineNodes.filter((n) => n.priority === 'P2').length}
                        </span>
                      </div>
                    </div>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 mt-2.5 mb-3.5 leading-relaxed">
                      {stepItem.flowDesc}
                    </p>

                    {/* Interactive Sub-function Nodes Chips */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          模組子功能節點（點擊查看規格）
                        </span>
                        <span className="text-[10px] text-orange-600 font-medium">
                          符合條件：{filteredPipelineNodes.length} 項
                        </span>
                      </div>

                      {filteredPipelineNodes.length === 0 ? (
                        <div className="p-2.5 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                          此階段無符合【{activePriority}】優先級之功能
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {filteredPipelineNodes.map((node) => (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode({ node, moduleName: mainModule.name })}
                              className="group px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-orange-50 hover:border-orange-400 transition-all text-left flex items-center gap-2 cursor-pointer shadow-2xs"
                            >
                              <span className="font-semibold text-xs text-slate-700 group-hover:text-orange-600 transition-colors">
                                {node.name}
                              </span>
                              <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded border shrink-0 ${priorityBadges[node.priority]}`}>
                                {node.priority}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Flow Connector Arrow to Next Step */}
                  {!stepItem.isEnd && (
                    <div className="py-3 flex flex-col items-center">
                      <div className="w-0.5 h-5 bg-slate-300" />
                      <div className="px-3 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-semibold text-slate-600 shadow-2xs my-0.5 flex items-center gap-1">
                        <span>{stepItem.connectionLabel}</span>
                        <ArrowDown className="w-3 h-3 text-orange-500" />
                      </div>
                      <div className="w-0.5 h-5 bg-slate-300" />
                    </div>
                  )}

                  {/* Closing Return Loop Connector */}
                  {stepItem.isEnd && (
                    <div className="mt-6 pt-5 border-t border-dashed border-slate-300 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-50 to-emerald-50 border border-orange-200 text-xs font-bold text-slate-700 shadow-xs">
                        <Repeat className="w-4 h-4 text-orange-500 animate-spin-slow" />
                        <span>生活物資管理循環閉環：採買完成自動回補庫存 ➔ 形成家庭自主物資流動自循環 ↺</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
"""

with open('src/pages/FunctionalMap.tsx', 'w', encoding='utf-8') as f:
    f.write(functional_map_code)

print("FunctionalMap.tsx updated with Flowchart View successfully")
