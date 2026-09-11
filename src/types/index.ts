export type TabId = 'overview' | 'functional-map' | 'wireframe' | 'user-flow' | 'prototype';

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  role: string;
  familyType: string;
  housing: string;
  habits: string[];
  painPoints: string[];
  quote: string;
  avatarIcon: string;
}

export interface PainPointSolution {
  id: string;
  painPoint: string;
  impact: string;
  solution: string;
  featureModule: string;
  badgeColor: string;
}

export type PriorityLevel = 'MVP' | 'P1' | 'P2';

export interface FunctionalNode {
  id: string;
  name: string;
  priority: PriorityLevel;
  description: string;
  targetPainPoint: string;
  details: string[];
}

export interface FunctionalModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: FunctionalNode[];
}

export interface WireframeScreen {
  id: string;
  name: string;
  nameEn: string;
  badge: string;
  purpose: string;
  userTask: string;
  addressedPainPoint: string;
  asciiArt: string;
  keyElements: {
    title: string;
    description: string;
  }[];
  interactionNotes: string[];
}

export interface FlowStep {
  stepNumber: number;
  actor: string;
  action: string;
  screen: string;
  details?: string;
  isDecision?: boolean;
  branches?: {
    condition: string;
    target: string;
  }[];
}

export interface UserFlowTask {
  id: string;
  title: string;
  description: string;
  trigger: string;
  outcome: string;
  steps: FlowStep[];
}

export interface ExceptionCase {
  id: string;
  title: string;
  trigger: string;
  systemResponse: string;
  uxDesignPrinciple: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'normal' | 'expiring' | 'expired' | 'low-stock';
  icon: string;
  inShoppingList?: boolean;
}
