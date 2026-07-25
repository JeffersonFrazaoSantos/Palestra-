export type AppMode = 'presentation' | 'explorer' | 'quiz' | 'builder';

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    level: 1 | 2 | 3; // 1 = Quem Pede, 2 = Quem Delega, 3 = Quem Desenha
    points: number;
  }[];
}

export interface MaturityResult {
  level: 1 | 2 | 3;
  title: string;
  badge: string;
  summary: string;
  characteristics: string[];
  nextSteps: string[];
  bottlenecks: string[];
}

export interface AgentPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  keyRule: string;
  example: string;
  antiPattern: string;
}

export interface SquadNode {
  id: string;
  name: string;
  role: string;
  function: string;
  skills: string[];
  permissions: string[];
  x: number;
  y: number;
  status: 'idle' | 'processing' | 'active';
  connections: string[];
  modelType?: string;
  latencyAvg?: string;
  systemPromptSnippet?: string;
  inputTrigger?: string;
  outputArtifact?: string;
  architectureType?: string;
  guardrails?: string[];
}

export interface AgentSpec {
  name: string;
  squadName: string;
  singleFunction: string;
  targetAudience: string;
  instructions: string;
  brandGuardrails: string;
  systemPermissions: string[];
  triggerEvent: string;
  outputFormat: string;
}

export interface SlideItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  speakerNotes: string;
}
