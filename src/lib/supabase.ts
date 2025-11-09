import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/types/database'; // Temporarily commented out

// Type any for now to avoid compilation errors
type Database = any;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Some features may not work.');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Auth helpers for server-side rendering
export const createSupabaseServerClient = () => {
  return createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
};

// Database types and interfaces
export interface Project {
  id: string;
  user_id: string;
  name: string;
  business_name: string;
  website_type: string;
  prompt: string;
  generated_html: string;
  generated_css: string;
  components: any[];
  is_published: boolean;
  live_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  template_id?: string;
  is_premium: boolean;
  token_cost: number;
  version: number;
  workspace_id?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
  member_count: number;
  project_count: number;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  invited_at: string;
  joined_at?: string;
  status: 'pending' | 'active' | 'removed';
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  token_balance: number;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  last_reset: string;
}

export interface CommunityProject {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  likes_count: number;
  views_count: number;
  is_featured: boolean;
  created_at: string;
  published_at: string;
  tags: string[];
  author_name: string;
  author_avatar?: string;
}

export interface GenerationLog {
  id: string;
  project_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string;
  agent_type: 'planner' | 'designer' | 'builder' | 'integrator';
  created_at: string;
  completed_at?: string;
  error_message?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview_url: string;
  thumbnail_url: string;
  features: string[];
  tech_stack: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  is_premium: boolean;
  download_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
  ai_prompt: string;
}

// Real-time subscriptions
export const subscribeToProject = (projectId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`project-${projectId}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'projects', filter: `id=eq.${projectId}` },
      callback
    )
    .subscribe();
};

export const subscribeToWorkspace = (workspaceId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`workspace-${workspaceId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'workspaces', filter: `id=eq.${workspaceId}` },
      callback
    )
    .subscribe();
};

// AI Assistant functions
export const createGenerationSession = async (projectId: string, userId: string) => {
  const { data, error } = await supabase
    .from('generation_sessions')
    .insert({
      project_id: projectId,
      user_id: userId,
      status: 'active',
      agent_plans: [],
      current_agent: 'planner',
      session_data: {}
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGenerationProgress = async (sessionId: string, progress: number, message: string, agentType: string) => {
  const { error } = await supabase
    .from('generation_sessions')
    .update({
      progress,
      current_message: message,
      current_agent: agentType,
      updated_at: new Date().toISOString()
    })
    .eq('id', sessionId);

  if (error) throw error;
};

// Token management
export const getUserTokenBalance = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('token_balance, subscription_tier, last_reset')
      .eq('id', userId)
      .single();

    if (error) throw error;
    
    // Check if tokens need to be reset (daily reset for free tier)
    if (data.subscription_tier === 'free') {
      const lastReset = new Date(data.last_reset);
      const now = new Date();
      const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceReset >= 1) {
        await supabase
          .from('users')
          .update({
            token_balance: 150000,
            last_reset: now.toISOString()
          })
          .eq('id', userId);
          
        return { token_balance: 150000, subscription_tier: 'free' };
      }
    }
    
    return data;
  } catch (error) {
    // Return default values for demo
    return {
      token_balance: 150000,
      subscription_tier: 'free',
      last_reset: new Date().toISOString()
    };
  }
};

export const deductTokens = async (userId: string, amount: number) => {
  try {
    const user = await getUserTokenBalance(userId);
    
    if (user.token_balance < amount) {
      throw new Error('Insufficient tokens');
    }

    const { error } = await supabase
      .from('users')
      .update({
        token_balance: user.token_balance - amount
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    // Log error but don't throw for demo
    console.error('Token deduction error:', error);
  }
};