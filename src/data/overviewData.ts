import { Persona, PainPointSolution } from '../types';

export const productInfo = {
  name: '智慧物品庫存 APP (SmartStock)',
  subtitle: '都市小資家庭的智慧生活管理夥伴',
  statement: '一個協助都市小資家庭記錄、查找與管理家中物品的智慧庫存 APP。',
  challenge: '如何讓家庭使用者在不增加太多輸入負擔的情況下，清楚掌握家中的物品、數量與有效期限？',
  goal: '透過快速新增、庫存總覽與智慧提醒，降低物品過期、重複購買與庫存失控的情況。',
  coreLoop: [
    { step: '01', title: '快速記錄', desc: '手動預設標籤、條碼掃描、拍照辨識，極簡化盤點負擔' },
    { step: '02', title: '隨時查看', desc: '空間維度、分類維度、智慧搜尋，隨時同步掌握' },
    { step: '03', title: '即時提醒', desc: '到期前 3 天推播、過期標記、低庫存提示，避免遺忘' },
    { step: '04', title: '防重防耗', desc: '重複購買預警、直接轉採買清單，聰明精省荷包' },
  ],
};

export const personas: Persona[] = [
  {
    id: 'p1',
    name: '林小姐 & 陳先生 (頂客族夫妻)',
    tagline: '雙薪忙碌、空間有限的都會小家庭',
    role: '都會租屋小家庭 (2人同住)',
    familyType: '2人夫妻小家庭',
    housing: '市區 18 坪大樓兩房，收納空間珍貴',
    habits: [
      '平日下廚 2~3 天，常在冰箱深處發現被遺忘的調味料',
      '兩人各買各的，經常發生「先生買了醬油，太太下班也買了醬油」的重複狀況',
      '工作節奏快，下班後沒耐性逐筆打字建檔庫存',
    ],
    painPoints: [
      '不清楚冰箱深處與櫃子裡還有多少庫存',
      '兩人購買資訊無法即時同步，造成金錢與空間浪費',
      '調味料、乳製品頻頻過期發霉',
    ],
    quote: '「我們不是不整理，而是生活太忙，買東西前根本記不起家裡到底還有沒有！」',
    avatarIcon: 'Users',
  },
  {
    id: 'p2',
    name: '黃媽媽 (精打細算小資媽媽)',
    tagline: '美式賣場囤貨專家、比價高手',
    role: '三口小資家庭主婦',
    familyType: '夫妻 + 1 個 5 歲小孩',
    housing: '三房公寓，設有乾貨櫃與工作陽台儲藏架',
    habits: [
      '看到促銷或趁黑五大量採買衛生紙、洗衣精、常溫罐頭',
      '喜歡把大量包裝分裝成小瓶罐使用，原包裝藏在床底或高處',
      '過年或大掃除時，常清出一整箱過期 1 年的備用品',
    ],
    painPoints: [
      '大量囤貨後，忘記特定備品究竟藏在哪個櫃子或箱子',
      '洗衣精、洗碗精快用完時忘了補貨，用到最後一滴才手忙腳亂',
      '常溫食品標籤字體太小，常常放到過期',
    ],
    quote: '「特價買便宜是為了省錢，結果放到過期扔掉反而虧更多！」',
    avatarIcon: 'ShoppingBag',
  },
  {
    id: 'p3',
    name: 'Kevin (旅遊與質感生活愛好者)',
    tagline: '出國伴手禮買家、限定商品收藏者',
    role: '單身生活 / 與室友合租',
    familyType: '1人居住，注重生活品味',
    housing: '開放式套房，收納櫃有限',
    habits: [
      '每年出國 2~3 次，日本伴手禮、限定零食、保養品買好買滿',
      '東西常捨不得一次吃完或用完，珍藏著卻錯過了賞味期限',
      '偶爾心血來潮想找某瓶國外買的辣油，翻箱倒櫃找不到',
    ],
    painPoints: [
      '日文或外文有效期限格式不同，容易看錯換算',
      '伴手禮數量分散在行李箱、抽屜與層架',
      '捨不得吃卻變成過期垃圾，感到罪惡感滿滿',
    ],
    quote: '「從日本辛辛苦苦扛回來的限量零食，放到過期才看到，真的心痛！」',
    avatarIcon: 'Compass',
  },
];

export const painPointSolutions: PainPointSolution[] = [
  {
    id: 'pps-1',
    painPoint: '不知道家中目前有哪些物品',
    impact: '購物前無法核對，造成盲目採購或生活困擾',
    solution: '首頁儀表板整合所有庫存，提供全局搜尋、分類標籤與即時數量統計。',
    featureModule: '首頁總覽 & 物品庫存管理',
    badgeColor: 'blue',
  },
  {
    id: 'pps-2',
    painPoint: '忘記物品放在哪裡',
    impact: '翻箱倒櫃浪費時間，甚至重複購買以為遺失的物品',
    solution: '多層級空間管理（冰箱冷藏/冷凍、廚房乾貨櫃、陽台儲藏架），一鍵篩選位置。',
    featureModule: '家庭與空間設定',
    badgeColor: 'indigo',
  },
  {
    id: 'pps-3',
    painPoint: '食品或用品放到過期才發現',
    impact: '食物浪費、健康疑慮，增加家庭無謂開銷',
    solution: '到期日視覺化警示（過期紅色、3天內橘色），提前 3 天推播通知，提供快速標記消耗。',
    featureModule: '期限與庫存提醒',
    badgeColor: 'amber',
  },
  {
    id: 'pps-4',
    painPoint: '已有相同物品，卻因忘記而重複購買',
    impact: '小坪數空間被重複備品塞滿，金錢浪費',
    solution: '新增物品時自動比對同名與同類物品，彈出重複預警 Modal，顯示目前現有庫存。',
    featureModule: '新增與盤點 (重複提醒)',
    badgeColor: 'rose',
  },
  {
    id: 'pps-5',
    painPoint: '家人之間無法同步知道庫存狀態',
    impact: '訊息溝通落差，下班時兩人都買了同一盒牛奶或衛生紙',
    solution: '家庭成員共用雲端空間，誰消耗、誰補貨即時動態更新，低庫存一鍵匯入採買清單。',
    featureModule: '採買與消耗管理 (成員共享)',
    badgeColor: 'emerald',
  },
  {
    id: 'pps-6',
    painPoint: '盤點逐項手動輸入資料過於繁瑣',
    impact: '使用者失去記帳與登記習慣，APP 三分鐘熱度被棄用',
    solution: '極簡手動輸入、常用分類預設快捷鍵，後續支援條碼掃描與 OCR 效期自動辨識。',
    featureModule: '新增與盤點 (智慧化)',
    badgeColor: 'purple',
  },
];

export const designJourneySteps = [
  {
    step: '01',
    id: 'overview',
    title: '專案概覽 (Overview)',
    desc: '定義使用者輪廓、聚焦都市小資家庭 6 大痛點與核心產品目標。',
    icon: 'Sparkles',
  },
  {
    step: '02',
    id: 'functional-map',
    title: '功能地圖 (Functional Map)',
    desc: '從問題推演 7 大功能模組，梳理 MVP、P1、P2 優先級開發藍圖。',
    icon: 'Network',
  },
  {
    step: '03',
    id: 'wireframe',
    title: '介面線框稿 (Wireframe)',
    desc: '首頁、列表、詳情、新增、提醒 5 大核心畫面架構與任務操作配置。',
    icon: 'LayoutTemplate',
  },
  {
    step: '04',
    id: 'user-flow',
    title: '使用者流程 (User Flow)',
    desc: '3 大核心任務路徑、分支決策判斷，以及 7 大重要例外情境防呆。',
    icon: 'GitCommit',
  },
  {
    step: '05',
    id: 'prototype',
    title: '互動原型 (Prototype)',
    desc: '嵌入式手機模擬器，支援新增輸入、提醒處理與採買清單即時互動。',
    icon: 'Smartphone',
  },
];
