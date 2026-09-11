import React, { useState } from 'react';
import { TabId, InventoryItem } from '../types';
import { initialInventoryList } from '../data/initialInventory';
import { 
  Smartphone, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShoppingCart, 
  Bell, 
  Search, 
  ChevronLeft, 
  Home, 
  Package, 
  Check, 
  ShieldAlert
} from '../components/Icons';

interface PrototypeProps {
  onNavigateTab: (tab: TabId) => void;
}

type AppScreen = 'home' | 'list' | 'detail' | 'add' | 'reminders' | 'shopping';
type GuidedFlow = 'flow1' | 'flow2' | 'flow3' | 'free';

export const Prototype: React.FC<PrototypeProps> = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialInventoryList);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedItemId, setSelectedItemId] = useState<string>('item-1');
  
  const [activeFlow, setActiveFlow] = useState<GuidedFlow>('flow1');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>('常溫燕麥奶');
  const [formCategory, setFormCategory] = useState<string>('食品');
  const [formQty, setFormQty] = useState<number>(1);
  const [formUnit, setFormUnit] = useState<string>('瓶');
  const [formLocation, setFormLocation] = useState<string>('廚房乾貨櫃');
  const [formExpiry, setFormExpiry] = useState<string>('2026/10/30');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleReset = () => {
    setItems(initialInventoryList);
    setCurrentScreen('home');
    setSelectedItemId('item-1');
    setCurrentStep(1);
    setShowDuplicateWarning(false);
    setFormName('常溫燕麥奶');
    setFormCategory('食品');
    setFormQty(1);
    setFormUnit('瓶');
    setFormLocation('廚房乾貨櫃');
    setFormExpiry('2026/10/30');
    triggerToast('模擬器已重置為初始家庭庫存狀態');
  };

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const expiringItems = items.filter((i) => i.daysRemaining >= 0 && i.daysRemaining <= 7 && i.quantity > 0);
  const expiredItems = items.filter((i) => i.daysRemaining < 0 && i.quantity > 0);
  const lowStockItems = items.filter((i) => i.status === 'low-stock' || i.quantity <= 1);
  const shoppingListItems = items.filter((i) => i.inShoppingList);

  const handleNameChange = (val: string) => {
    setFormName(val);
    if (val.includes('牛奶') || val.includes('鮮乳')) {
      setShowDuplicateWarning(true);
    } else {
      setShowDuplicateWarning(false);
    }
  };

  const handleSaveItem = () => {
    if (!formName.trim()) {
      triggerToast('請輸入物品名稱！');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const newItem: InventoryItem = {
        id: `item-${Date.now()}`,
        name: formName,
        category: formCategory,
        location: formLocation,
        quantity: formQty,
        unit: formUnit,
        purchaseDate: '2026/09/11',
        expiryDate: formExpiry,
        daysRemaining: 45,
        status: 'normal',
        icon: formCategory === '食品' ? '🥛' : '📦',
        inShoppingList: false,
      };
      setItems([newItem, ...items]);
      setCurrentScreen('list');
      if (activeFlow === 'flow1') setCurrentStep(4);
      triggerToast(`✓ 成功新增「${formName}」入庫！`);
    }, 400);
  };

  const handleMarkUsed = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.quantity - 1);
          return {
            ...item,
            quantity: newQty,
            daysRemaining: newQty === 0 ? -99 : item.daysRemaining,
          };
        }
        return item;
      })
    );
    if (activeFlow === 'flow2') setCurrentStep(4);
    triggerToast(`✓ 已標記扣減「${selectedItem.name}」1 單位庫存！`);
  };

  const handleToggleShopping = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, inShoppingList: true };
        }
        return item;
      })
    );
    if (activeFlow === 'flow3') setCurrentStep(3);
    triggerToast(`🛒 已將「${items.find((i) => i.id === itemId)?.name}」加入採買清單！`);
  };

  const handleCompletePurchase = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            inShoppingList: false,
            quantity: item.quantity + 1,
            status: 'normal',
          };
        }
        return item;
      })
    );
    if (activeFlow === 'flow3') setCurrentStep(4);
    triggerToast('✓ 採買完成！物品已回補庫存！');
  };
  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-semibold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            Step 05 ・ 可操作之高保真互動原型
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Prototype 互動原型模擬器
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            真實呈現 APP 在手機上的微互動與狀態回饋。左側為任務導引面板，右側手機模擬器支援表單打字、重複物品警告、即時扣庫與採買清單連動。
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all shrink-0 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
          <span>重設所有測試資料</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              選擇引導任務流程 (Guide Mode)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setActiveFlow('flow1');
                  setCurrentStep(1);
                  setCurrentScreen('home');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  activeFlow === 'flow1'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono block mb-0.5 opacity-80">任務一</span>
                <span className="font-bold text-xs block">新增物品入庫</span>
                <span className="text-[10px] opacity-75">含重複防呆比對</span>
              </button>

              <button
                onClick={() => {
                  setActiveFlow('flow2');
                  setCurrentStep(1);
                  setCurrentScreen('home');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  activeFlow === 'flow2'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono block mb-0.5 opacity-80">任務二</span>
                <span className="font-bold text-xs block">處理到期提醒</span>
                <span className="text-[10px] opacity-75">標記食用並扣庫</span>
              </button>

              <button
                onClick={() => {
                  setActiveFlow('flow3');
                  setCurrentStep(1);
                  setCurrentScreen('reminders');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  activeFlow === 'flow3'
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono block mb-0.5 opacity-80">任務三</span>
                <span className="font-bold text-xs block">低庫存轉採買</span>
                <span className="text-[10px] opacity-75">採買並回補庫存</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-orange-600 uppercase bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                Step {currentStep} of 4
              </span>
              <span className="text-xs text-slate-400">
                {activeFlow === 'flow1' && '任務一：新增物品'}
                {activeFlow === 'flow2' && '任務二：處理到期'}
                {activeFlow === 'flow3' && '任務三：採買閉環'}
              </span>
            </div>

            {activeFlow === 'flow1' && (
              <div className="space-y-3 text-xs text-slate-700">
                {currentStep === 1 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 1：發起新增</span>
                    請在右側手機畫面中，點擊【＋ 新增物品】橘色按鈕或下方導覽列「＋」。
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 2：填寫資料與測試防呆</span>
                    可點擊快捷填入【鮮乳】體驗「重複物品警告」，或保持預設【燕麥奶】並點擊底部【確認儲存物品入庫】。
                  </div>
                )}
                {currentStep >= 3 && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 leading-relaxed">
                    <span className="font-bold block mb-1">🎉 任務一完成！</span>
                    新物品已成功加入庫存清單，並即時更新首頁總件數。您可以切換其他任務或自由探索！
                  </div>
                )}
              </div>
            )}

            {activeFlow === 'flow2' && (
              <div className="space-y-3 text-xs text-slate-700">
                {currentStep === 1 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 1：檢視急迫警示</span>
                    在首頁點擊【即將到期】方塊，或下方優先處理清單中的【全脂鮮乳】。
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 2：進入物品詳情</span>
                    在提醒中心清單中，點選【鮮乳】查看存放位置與到期倒數。
                  </div>
                )}
                {currentStep >= 3 && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 leading-relaxed">
                    <span className="font-bold block mb-1">🎉 任務二完成！</span>
                    鮮乳已標記使用並扣除庫存，提醒中心待辦數量即時扣除，成功避免食物過期發霉浪費！
                  </div>
                )}
              </div>
            )}

            {activeFlow === 'flow3' && (
              <div className="space-y-3 text-xs text-slate-700">
                {currentStep === 1 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 1：定位低庫存物品</span>
                    在提醒中心「庫存不足」分區中，找到【濃縮洗衣精】並點選【加入採買清單】。
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl leading-relaxed">
                    <span className="font-bold block text-orange-900 mb-1">步驟 2：前往採買清單</span>
                    點選手機底部導覽列的【採買】，進入清單確認待買項目。
                  </div>
                )}
                {currentStep >= 3 && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 leading-relaxed">
                    <span className="font-bold block mb-1">🎉 任務三完成！</span>
                    點擊【標記已採買完成】後，洗衣精已完成結帳並回補庫存！
                  </div>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                目前模擬器狀態驗證 (States Achieved)
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>初始數據載入正常</span>
                </span>
                <span className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                  showDuplicateWarning 
                    ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' 
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}>
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
                  <span>重複物品防呆提醒</span>
                </span>
                <span className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                  items.length > 7
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>儲存入庫動態新增</span>
                </span>
                <span className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                  shoppingListItems.length > 0
                    ? 'bg-sky-50 border-sky-200 text-sky-700 font-bold'
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}>
                  <ShoppingCart className="w-3.5 h-3.5 text-sky-500" />
                  <span>低庫存轉採買清單</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-sm rounded-[44px] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-2xl relative">
            <div className="w-28 h-5 bg-black rounded-full mx-auto mb-1 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>

            <div className="bg-slate-50 rounded-[32px] overflow-hidden flex flex-col h-[620px] relative font-sans text-xs">
              <div className="h-6 bg-white px-5 flex items-center justify-between text-[11px] font-bold text-slate-800 shrink-0 border-b border-slate-100">
                <span>09:41</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {toastMessage && (
                <div className="absolute top-8 inset-x-4 z-50 bg-slate-900/95 text-white p-2.5 rounded-xl shadow-lg border border-slate-700 text-center text-xs font-semibold animate-fade-in">
                  {toastMessage}
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4">
                {/* 1. HOME SCREEN */}
                {currentScreen === 'home' && (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">HOME SWEET HOME</span>
                        <h3 className="font-bold text-sm text-slate-900">我的家庭</h3>
                        <p className="text-[11px] text-slate-500">晚安，Chuyin ・ 庫存良好</p>
                      </div>
                      <button 
                        onClick={() => setCurrentScreen('reminders')}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center relative cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-slate-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div 
                        onClick={() => setCurrentScreen('list')}
                        className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-slate-300"
                      >
                        <span className="text-xl font-black text-slate-900 font-mono block">{totalCount}</span>
                        <span className="text-[11px] text-slate-500">全部物品 (件)</span>
                      </div>
                      <div 
                        onClick={() => {
                          setCurrentScreen('reminders');
                          if (activeFlow === 'flow2') setCurrentStep(2);
                        }}
                        className="p-3 bg-orange-50 rounded-xl border border-orange-200 shadow-2xs cursor-pointer hover:border-orange-300"
                      >
                        <span className="text-xl font-black text-orange-600 font-mono block">{expiringItems.length}</span>
                        <span className="text-[11px] text-orange-800 font-semibold">即將到期 (件)</span>
                      </div>
                      <div 
                        onClick={() => setCurrentScreen('reminders')}
                        className="p-3 bg-rose-50 rounded-xl border border-rose-200 shadow-2xs cursor-pointer hover:border-rose-300"
                      >
                        <span className="text-xl font-black text-rose-600 font-mono block">{expiredItems.length}</span>
                        <span className="text-[11px] text-rose-800 font-semibold">已過期 (件)</span>
                      </div>
                      <div 
                        onClick={() => setCurrentScreen('reminders')}
                        className="p-3 bg-amber-50 rounded-xl border border-amber-200 shadow-2xs cursor-pointer hover:border-amber-300"
                      >
                        <span className="text-xl font-black text-amber-600 font-mono block">{lowStockItems.length}</span>
                        <span className="text-[11px] text-amber-800 font-semibold">低庫存 (件)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setCurrentScreen('add');
                          if (activeFlow === 'flow1') setCurrentStep(2);
                        }}
                        className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>新增物品</span>
                      </button>
                      <button
                        onClick={() => setCurrentScreen('shopping')}
                        className="py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 text-slate-500" />
                        <span>採買清單 ({shoppingListItems.length})</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        需要優先處理
                      </span>
                      <div className="space-y-1.5">
                        {items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedItemId(item.id);
                              setCurrentScreen('detail');
                              if (activeFlow === 'flow2') setCurrentStep(3);
                            }}
                            className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:border-orange-300 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">{item.icon}</span>
                              <div>
                                <span className="font-bold text-slate-800">{item.name}</span>
                                <span className="text-[10px] text-slate-400 block">{item.location}</span>
                              </div>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              item.status === 'expiring' 
                                ? 'bg-orange-100 text-orange-700' 
                                : item.status === 'expired' 
                                ? 'bg-rose-100 text-rose-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.status === 'expiring' ? `${item.daysRemaining} 天後到期` : item.status === 'expired' ? '已過期' : '建議補貨'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. INVENTORY LIST SCREEN */}
                {currentScreen === 'list' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-900">家庭庫存列表</h3>
                      <button
                        onClick={() => setCurrentScreen('add')}
                        className="px-2.5 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold"
                      >
                        ＋ 新增
                      </button>
                    </div>

                    <div className="p-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-slate-400 text-xs">
                      <Search className="w-3.5 h-3.5" />
                      <span>搜尋全部 {items.length} 樣物品...</span>
                    </div>

                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItemId(item.id);
                            setCurrentScreen('detail');
                          }}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:border-orange-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-bold text-slate-800">{item.name}</h4>
                              <span className="text-[10px] text-slate-400">{item.category}・{item.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-800 block">{item.quantity} {item.unit}</span>
                            <span className="text-[10px] text-slate-400">效期：{item.expiryDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. ITEM DETAIL SCREEN */}
                {currentScreen === 'detail' && (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="flex items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>返回</span>
                      </button>
                      <span className="font-bold text-slate-800 text-sm">物品檔案</span>
                      <span className="w-8" />
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
                      <span className="text-4xl block mb-1">{selectedItem.icon}</span>
                      <h3 className="font-bold text-base text-slate-900">{selectedItem.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{selectedItem.category} ・ {selectedItem.location}</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        現有庫存存量
                      </span>
                      <div className="flex items-center justify-center gap-4 my-2">
                        <button
                          onClick={() => handleMarkUsed(selectedItem.id)}
                          className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 font-bold text-sm cursor-pointer hover:bg-slate-200"
                        >
                          −
                        </button>
                        <span className="text-xl font-black text-slate-900 font-mono">
                          {selectedItem.quantity} {selectedItem.unit}
                        </span>
                        <button
                          onClick={() => {
                            setItems((prev) =>
                              prev.map((i) => (i.id === selectedItem.id ? { ...i, quantity: i.quantity + 1 } : i))
                            );
                            triggerToast('庫存已累加 1 瓶！');
                          }}
                          className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 font-bold text-sm cursor-pointer hover:bg-slate-200"
                        >
                          ＋
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          onClick={() => handleMarkUsed(selectedItem.id)}
                          className="py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>標記已使用</span>
                        </button>
                        <button
                          onClick={() => handleToggleShopping(selectedItem.id)}
                          className="py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>加入採買清單</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-400">有效期限</span>
                        <span className="font-semibold text-slate-700">{selectedItem.expiryDate}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-400">購買日期</span>
                        <span className="text-slate-700">{selectedItem.purchaseDate}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">主動提醒</span>
                        <span className="font-semibold text-emerald-600">到期前 3 天推播</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* 4. ADD ITEM FORM SCREEN */}
                {currentScreen === 'add' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="text-xs text-slate-500 font-semibold cursor-pointer"
                      >
                        取消
                      </button>
                      <h3 className="font-bold text-sm text-slate-900">新增家庭物品</h3>
                      <span className="w-8" />
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleNameChange('全脂鮮乳')}
                        className="flex-1 py-1 px-2 bg-slate-100 hover:bg-orange-50 text-[10px] rounded-lg font-semibold text-slate-600 border border-slate-200 cursor-pointer text-center"
                      >
                        填入「鮮乳」(測重複防呆)
                      </button>
                      <button
                        onClick={() => handleNameChange('常溫燕麥奶')}
                        className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 text-[10px] rounded-lg font-semibold text-slate-600 border border-slate-200 cursor-pointer text-center"
                      >
                        填入「燕麥奶」(測新物資)
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          物品名稱 <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="例如：牛奶、洗衣精"
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-orange-500 outline-hidden"
                        />

                        {showDuplicateWarning && (
                          <div className="mt-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-[10px] text-rose-800 animate-fade-in flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block">偵測到可能重複之庫存！</span>
                              冰箱中已有一瓶鮮乳。是否直接在首頁累加數量？
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">分類</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                          >
                            <option value="食品">食品</option>
                            <option value="日用品">日用品</option>
                            <option value="清潔用品">清潔用品</option>
                            <option value="藥品">藥品</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">存放位置</label>
                          <select
                            value={formLocation}
                            onChange={(e) => setFormLocation(e.target.value)}
                            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                          >
                            <option value="冰箱冷藏">冰箱冷藏</option>
                            <option value="廚房乾貨櫃">廚房乾貨櫃</option>
                            <option value="儲藏室">儲藏室</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">數量</label>
                          <input
                            type="number"
                            min="1"
                            value={formQty}
                            onChange={(e) => setFormQty(Number(e.target.value))}
                            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-center font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">單位</label>
                          <select
                            value={formUnit}
                            onChange={(e) => setFormUnit(e.target.value)}
                            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                          >
                            <option value="瓶">瓶</option>
                            <option value="罐">罐</option>
                            <option value="盒">盒</option>
                            <option value="包">包</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">有效期限</label>
                        <input
                          type="date"
                          value="2026-10-30"
                          readOnly
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleSaveItem}
                        disabled={isSaving}
                        className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isSaving ? '儲存中...' : '確認儲存物品入庫'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. REMINDERS SCREEN */}
                {currentScreen === 'reminders' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">提醒中心</h3>
                        <span className="text-[10px] text-orange-600 font-bold block">
                          共 {expiringItems.length + expiredItems.length + lowStockItems.length} 項待辦事項
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">
                        3 天內即將到期
                      </span>
                      <div className="space-y-1.5">
                        {expiringItems.map((item) => (
                          <div key={item.id} className="p-2.5 bg-white rounded-xl border border-orange-200 shadow-2xs space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                                  <span className="text-[10px] text-slate-400">{item.location}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-orange-600">剩 {item.daysRemaining} 天</span>
                            </div>
                            <div className="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                              <button
                                onClick={() => handleMarkUsed(item.id)}
                                className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-600 cursor-pointer"
                              >
                                標記已使用
                              </button>
                              <button
                                onClick={() => handleToggleShopping(item.id)}
                                className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg text-[10px] font-bold hover:bg-orange-100 cursor-pointer"
                              >
                                加入採買
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-1">
                        庫存不足 (低水位)
                      </span>
                      <div className="space-y-1.5">
                        {lowStockItems.map((item) => (
                          <div key={item.id} className="p-2.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                                  <span className="text-[10px] text-slate-400">{item.unit}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-amber-600">建議補貨</span>
                            </div>
                            <div className="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                              <button
                                onClick={() => handleToggleShopping(item.id)}
                                className="px-2.5 py-1 bg-orange-500 text-white rounded-lg text-[10px] font-bold hover:bg-orange-600 cursor-pointer"
                              >
                                加入採買清單
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. SHOPPING LIST SCREEN */}
                {currentScreen === 'shopping' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-900">家庭採買清單</h3>
                      <span className="text-[10px] text-slate-400">共 {shoppingListItems.length} 項待買物資</span>
                    </div>

                    {shoppingListItems.length === 0 ? (
                      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                        <span className="text-3xl block">🛒</span>
                        <h4 className="font-bold text-slate-700">目前沒有待買項目</h4>
                        <p className="text-[11px] text-slate-400">當物品低庫存時，可一鍵加入採買清單。</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {shoppingListItems.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.icon}</span>
                              <div>
                                <h4 className="font-bold text-slate-800">{item.name}</h4>
                                <span className="text-[10px] text-slate-400">{item.category}・預計採買 1 單位</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCompletePurchase(item.id)}
                              className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                            >
                              標記已採買完成
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Nav Bar */}
              <div className="h-14 bg-white border-t border-slate-200 px-3 flex items-center justify-around shrink-0 text-[10px] font-bold text-slate-400">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                    currentScreen === 'home' ? 'text-orange-500' : 'hover:text-slate-600'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>首頁</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('list')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                    currentScreen === 'list' ? 'text-orange-500' : 'hover:text-slate-600'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>庫存</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('add')}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center -mt-4 shadow-md shadow-orange-500/30 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentScreen('shopping')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer relative ${
                    currentScreen === 'shopping' ? 'text-orange-500' : 'hover:text-slate-600'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>採買</span>
                  {shoppingListItems.length > 0 && (
                    <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </button>

                <button
                  onClick={() => setCurrentScreen('reminders')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                    currentScreen === 'reminders' ? 'text-orange-500' : 'hover:text-slate-600'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>提醒</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
