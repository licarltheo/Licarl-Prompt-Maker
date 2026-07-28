export type Plan = 'free' | 'pro' | 'team' | 'enterprise';
export type Role = 'user' | 'admin' | 'owner';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  plan: Plan;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

export const AI_PROVIDERS = [
  'openai', 'anthropic', 'google', 'xai', 'deepseek', 'mistral',
  'groq', 'openrouter', 'together', 'cohere', 'azure', 'ollama',
] as const;

export type AIProvider = (typeof AI_PROVIDERS)[number];
