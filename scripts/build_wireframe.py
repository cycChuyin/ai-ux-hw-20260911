import os

def write_file(filepath, content):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {filepath}")

wireframe_page = """import React, { useState } from 'react';
import { TabId } from '../types';
import { wireframeScreens } from '../data/wireframeData';
import { 
  LayoutTemplate, 
  Code, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Search,
  Bell,
  Plus,
  ShoppingCart,
  Calendar,
  Camera,
  Barcode,
  ChevronRight
} from 'lucide-react';

interface WireframeProps {
  onNavigateTab: (tab: TabId) => void;
}

export const Wireframe: React.FC<WireframeProps> = ({ onNavigateTab }) => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>('wf-1');
  const [viewFormat, setViewFormat] = useState<'visual' | 'ascii'>('visual');

  const currentScreen = wireframeScreens.find((s) => s.id === selectedScreenId) || wireframeScreens[0];

  const renderVisualScreen = (screenId: string) => {
    switch (screenId) {
      case 'wf-1':
        return (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-4 space-y-3 font-sans text-slate-800 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">LOCATION</span>
                <span className="font-bold text-sm text-slate-800">我的家庭</span>
                <p className="text-[11px] text-slate-500">晚安，Chuyin ・ 今天有 3 件物品需注意</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <Bell className="w-4 h-4 text-slate-600" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">家庭庫存概況</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xl font-black text-slate-900 font-mono block">86</span>
                  <span className="text-[11px] text-slate-500">全部物品 (件)</span>
                </div>
                <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 shadow-2xs">
                  <span className="text-xl font-black text-orange-600 font-mono block">4</span>
                  <span className="text-[11px] text-orange-700 font-medium">即將到期 (件)</span>
                </div>
                <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 shadow-2xs">
                  <span className="text-xl font-black text-rose-600 font-mono block">1</span>
                  <span className="text-[11px] text-rose-700 font-medium">已過期 (件)</span>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="text-xl font-black text-amber-600 font-mono block">6</span>
                  <span className="text-[11px] text-amber-700 font-medium">低庫存備品 (件)</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">快速操作</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="py-2.5 px-3 bg-orange-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-1 shadow-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增物品</span>
                </div>
                <div className="py-2.5 px-3 bg-slate-200 text-slate-700 font-bold rounded-xl text-center flex items-center justify-center gap-1">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>採買清單</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">需要優先處理</span>
              <div className="space-y-1.5">
                <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="font-semibold text-slate-800">🥛 牛奶</span>
                  </div>
                  <span className="text-[11px] font-medium text-orange-600">3 天後到期</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="font-semibold text-slate-800">🥣 優格</span>
                  </div>
                  <span className="text-[11px] font-medium text-rose-600">已過期 1 天</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-semibold text-slate-800">🧴 洗衣精</span>
                  </div>
                  <span className="text-[11px] font-medium text-amber-600">剩餘 10%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-around text-[10px] text-slate-400 font-medium">
              <span className="text-orange-600 font-bold">● 首頁</span>
              <span>庫存</span>
              <span className="font-bold text-slate-600">＋新增</span>
              <span>採買</span>
              <span>更多</span>
            </div>
          </div>
        );

      case 'wf-2':
        return (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-4 space-y-3 font-sans text-slate-800 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div>
                <span className="font-bold text-sm text-slate-800">庫存管理</span>
                <span className="text-[10px] text-slate-400 block">共納管 86 件家庭物資</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                ＋
              </div>
            </div>

            <div className="p-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-slate-400">
              <Search className="w-3.5 h-3.5" />
              <span>搜尋物品名稱、空間或標籤...</span>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-full font-semibold shrink-0">全部 (86)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full shrink-0">食品 (42)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full shrink-0">日用品 (20)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full shrink-0">清潔 (15)</span>
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 px-1">
              <span>位置篩選：全部空間 ▾</span>
              <span>排序：即將到期優先 ▾</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🥛</span>
                  <div>
                    <h5 className="font-bold text-slate-800">牛奶</h5>
                    <span className="text-[10px] text-slate-400">食品・冰箱冷藏</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold block text-slate-700">剩餘 1 瓶</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-medium">🟠 3 天後到期</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🥫</span>
                  <div>
                    <h5 className="font-bold text-slate-800">玉米罐頭</h5>
                    <span className="text-[10px] text-slate-400">食品・廚房櫃</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold block text-slate-700">剩餘 4 罐</span>
                  <span className="text-[10px] text-slate-400">效期 12/20</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧴</span>
                  <div>
                    <h5 className="font-bold text-slate-800">洗衣精</h5>
                    <span className="text-[10px] text-slate-400">清潔・工作陽台</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold block text-slate-700">剩餘 10%</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">🟡 建議補貨</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-around text-[10px] text-slate-400 font-medium">
              <span>首頁</span>
              <span className="text-orange-600 font-bold">● 庫存</span>
              <span className="font-bold text-slate-600">＋新增</span>
              <span>採買</span>
              <span>更多</span>
            </div>
          </div>
        );

      case 'wf-3':
        return (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-4 space-y-3.5 font-sans text-slate-800 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500">‹ 返回列表</span>
              <span className="font-bold text-sm text-slate-800">物品詳情</span>
              <span className="text-xs text-orange-600 font-semibold">編輯</span>
            </div>

            <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-4xl block mb-1">🥛</span>
              <h4 className="text-base font-bold text-slate-900">全脂鮮乳</h4>
              <p className="text-[11px] text-slate-500">食品・冰箱冷藏・🟠 3 天後到期</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 block mb-1 font-mono">現有庫存數量</span>
              <div className="flex items-center justify-center gap-4 my-1.5">
                <button className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-sm">
                  −
                </button>
                <span className="text-xl font-black text-slate-900 font-mono">1 瓶</span>
                <button className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-sm">
                  ＋
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="py-2 bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold rounded-lg text-xs">
                  ✓ 標記已使用
                </button>
                <button className="py-2 bg-orange-50 text-orange-700 border border-orange-300 font-bold rounded-lg text-xs">
                  🛒 加入採買清單
                </button>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">基本屬性規格</span>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">物品分類</span>
                <span className="font-semibold text-slate-800">食品類</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">存放位置</span>
                <span className="font-semibold text-slate-800">冰箱冷藏室 第二層</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">有效期限</span>
                <span className="font-semibold text-orange-600">2026/09/14 (剩 3 天)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">主動提醒</span>
                <span className="font-semibold text-slate-800">到期前 3 天推播</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-100/70 rounded-xl border border-slate-200 text-[10px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-600 block">異動紀錄 (Audit Trail)</span>
              <div>・09/10 由 陳先生 標記使用，數量由 2 變為 1 瓶</div>
              <div>・09/08 由 林小姐 新增物品入庫</div>
            </div>
          </div>
        );

      case 'wf-4':
        return (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-4 space-y-3 font-sans text-slate-800 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-500 font-bold">‹ 取消</span>
              <span className="font-bold text-sm text-slate-800">新增物品</span>
              <span className="w-8" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="py-2 px-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-slate-700 shadow-2xs">
                <Barcode className="w-3.5 h-3.5 text-indigo-500" />
                <span>掃描條碼</span>
              </div>
              <div className="py-2 px-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-slate-700 shadow-2xs">
                <Camera className="w-3.5 h-3.5 text-orange-500" />
                <span>拍照辨識</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  物品名稱 <span className="text-rose-500">*</span>
                </label>
                <div className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 font-medium">
                  牛奶
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  物品分類 <span className="text-rose-500">*</span>
                </label>
                <div className="p-2 bg-white rounded-lg border border-slate-300 flex justify-between text-slate-700">
                  <span>食品</span>
                  <span>▾</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">數量 *</label>
                  <div className="p-2 bg-white rounded-lg border border-slate-300 text-center font-bold">
                    1
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">單位</label>
                  <div className="p-2 bg-white rounded-lg border border-slate-300 flex justify-between text-slate-700">
                    <span>瓶</span>
                    <span>▾</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  存放位置 <span className="text-rose-500">*</span>
                </label>
                <div className="p-2 bg-white rounded-lg border border-slate-300 flex justify-between text-slate-700">
                  <span>冰箱冷藏</span>
                  <span>▾</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">有效期限</label>
                <div className="p-2 bg-white rounded-lg border border-slate-300 flex justify-between text-slate-700">
                  <span>2026/09/14</span>
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-600">
                <input type="checkbox" defaultChecked className="rounded text-orange-500" />
                <span className="text-[11px]">到期前 3 天主動推播通知</span>
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full py-2.5 bg-orange-500 text-white font-bold rounded-xl text-center shadow-xs">
                儲存物品
              </button>
            </div>
          </div>
        );

      case 'wf-5':
        return (
          <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-4 space-y-3 font-sans text-slate-800 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div>
                <span className="font-bold text-sm text-slate-800">提醒中心</span>
                <span className="text-[10px] text-orange-600 font-bold block">有 7 件物品需要處理</span>
              </div>
              <span className="text-xs text-slate-400">全部標記</span>
            </div>

            <div className="flex gap-1 text-[11px]">
              <span className="px-2 py-1 bg-slate-900 text-white rounded-lg font-semibold">全部 (7)</span>
              <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg">即將到期 (4)</span>
              <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg">已過期 (1)</span>
              <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg">低庫存 (2)</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">今天到期 / 已過期</span>
              <div className="p-2 bg-white rounded-xl border border-rose-200 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🥣</span>
                    <span className="font-bold text-slate-800">希臘優格</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600">已過期 1 天</span>
                </div>
                <div className="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                  <button className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">查看</button>
                  <button className="px-2 py-1 bg-rose-500 text-white rounded text-[10px] font-semibold">標記已丟棄</button>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">3 天內到期</span>
              <div className="space-y-1.5">
                <div className="p-2 bg-white rounded-xl border border-orange-200 shadow-2xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🥛</span>
                      <span className="font-bold text-slate-800">鮮乳 (1瓶)</span>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600">3 天後到期</span>
                  </div>
                  <div className="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                    <button className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">查看</button>
                    <button className="px-2 py-1 bg-orange-500 text-white rounded text-[10px] font-semibold">加入採買</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-1">庫存不足</span>
              <div className="p-2 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🧴</span>
                    <span className="font-bold text-slate-800">濃縮洗衣精</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600">剩約 10%</span>
                </div>
                <div className="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                  <button className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">查看</button>
                  <button className="px-2 py-1 bg-amber-600 text-white rounded text-[10px] font-semibold">加入採買</button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-around text-[10px] text-slate-400 font-medium">
              <span>首頁</span>
              <span>庫存</span>
              <span className="font-bold text-slate-600">＋新增</span>
              <span>採買</span>
              <span className="text-orange-600 font-bold">● 提醒</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Step 03 ・ 介面結構與版型線框稿
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Wireframe 介面線框稿
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            展示 APP 如何將功能地圖具體轉化為 5 大核心畫面結構。左側切換畫面任務，右側檢視手機外框高擬真線框稿與對應規範。
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewFormat('visual')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewFormat === 'visual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-orange-500" />
            <span>高擬真線框視圖</span>
          </button>
          <button
            onClick={() => setViewFormat('ascii')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              viewFormat === 'ascii' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-indigo-500" />
            <span>規格書原始 ASCII 碼</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">
              切換核心畫面
            </span>
            {wireframeScreens.map((screen) => {
              const isSelected = screen.id === selectedScreenId;
              return (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreenId(screen.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {screen.badge}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">{screen.name}</h4>
                      <p className={`text-[11px] ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>
                        {screen.nameEn}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                {currentScreen.badge} ・ 畫面目的
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{currentScreen.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {currentScreen.purpose}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                主要使用者任務 (User Task)
              </h4>
              <p className="text-xs text-slate-700 font-medium">
                {currentScreen.userTask}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                對應使用者痛點
              </h4>
              <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100 text-rose-800 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{currentScreen.addressedPainPoint}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                核心元件配置說明
              </h4>
              <div className="space-y-2">
                {currentScreen.keyElements.map((elem, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 block mb-0.5">{elem.title}</span>
                    <span className="text-slate-500 leading-relaxed">{elem.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                互動回饋規範
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentScreen.interactionNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">wireframe_canvas: {currentScreen.id}.ui</span>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {currentScreen.nameEn}
              </span>
            </div>

            <div className="flex justify-center">
              {viewFormat === 'visual' ? (
                <div className="w-full max-w-sm rounded-[36px] border-8 border-slate-800 bg-slate-800 p-2 shadow-2xl">
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-10 h-1 bg-slate-700 rounded-full" />
                  </div>
                  <div className="overflow-hidden rounded-[24px] bg-white">
                    {renderVisualScreen(currentScreen.id)}
                  </div>
                </div>
              ) : (
                <div className="w-full bg-slate-900 rounded-2xl p-6 text-slate-200 overflow-x-auto font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
                  <pre>{currentScreen.asciiArt}</pre>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">已理解介面結構？接續查看使用者操作路徑</span>
              <button
                onClick={() => onNavigateTab('user-flow')}
                className="px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>前往 User Flow (Step 04)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

write_file('src/pages/Wireframe.tsx', wireframe_page)
print("Wireframe page successfully written.")
