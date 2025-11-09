export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          business_name: string;
          website_type: string;
          prompt: string;
          generated_html?: string;
          generated_css?: string;
          components?: any[];
          is_published?: boolean;
          live_url?: string;
          thumbnail_url?: string;
          template_id?: string;
          is_premium?: boolean;
          token_cost?: number;
          version?: number;
          workspace_id?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          business_name?: string;
          website_type?: string;
          prompt?: string;
          generated_html?: string;
          generated_css?: string;
          components?: any[];
          is_published?: boolean;
          live_url?: string;
          thumbnail_url?: string;
          template_id?: string;
          is_premium?: boolean;
          token_cost?: number;
          version?: number;
          workspace_id?: string;
          updated_at?: string;
        };
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          description?: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          is_premium: boolean;
          member_count: number;
          project_count: number;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          owner_id: string;
          is_premium?: boolean;
        };
        Update: {
          name?: string;
          description?: string;
          is_premium?: boolean;
          member_count?: number;
          project_count?: number;
          updated_at?: string;
        };
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'member';
          invited_at: string;
          joined_at?: string;
          status: 'pending' | 'active' | 'removed';
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'member';
          status?: 'pending' | 'active' | 'removed';
        };
        Update: {
          role?: 'owner' | 'admin' | 'member';
          joined_at?: string;
          status?: 'pending' | 'active' | 'removed';
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
          token_balance: number;
          subscription_tier: 'free' | 'pro' | 'enterprise';
          last_reset: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string;
          avatar_url?: string;
          token_balance?: number;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          last_reset?: string;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string;
          token_balance?: number;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          last_reset?: string;
          updated_at?: string;
        };
      };
      community_projects: {
        Row: {
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
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          name: string;
          description?: string;
          thumbnail_url?: string;
          is_featured?: boolean;
          tags?: string[];
          author_name: string;
          author_avatar?: string;
        };
        Update: {
          name?: string;
          description?: string;
          thumbnail_url?: string;
          likes_count?: number;
          views_count?: number;
          is_featured?: boolean;
          tags?: string[];
          author_name?: string;
          author_avatar?: string;
        };
      };
      generation_sessions: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          status: 'active' | 'completed' | 'failed' | 'paused';
          progress: number;
          current_agent: 'planner' | 'designer' | 'builder' | 'integrator' | 'testing';
          current_message: string;
          agent_plans: any[];
          session_data: any;
          created_at: string;
          updated_at: string;
          completed_at?: string;
          error_message?: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          status?: 'active' | 'completed' | 'failed' | 'paused';
          current_agent?: 'planner' | 'designer' | 'builder' | 'integrator' | 'testing';
          current_message?: string;
          agent_plans?: any[];
          session_data?: any;
        };
        Update: {
          status?: 'active' | 'completed' | 'failed' | 'paused';
          progress?: number;
          current_agent?: 'planner' | 'designer' | 'builder' | 'integrator' | 'testing';
          current_message?: string;
          agent_plans?: any[];
          session_data?: any;
          completed_at?: string;
          error_message?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
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
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: string;
          preview_url: string;
          thumbnail_url: string;
          features?: string[];
          tech_stack?: string[];
          complexity?: 'beginner' | 'intermediate' | 'advanced';
          is_premium?: boolean;
          download_count?: number;
          rating?: number;
          ai_prompt: string;
        };
        Update: {
          name?: string;
          description?: string;
          category?: string;
          preview_url?: string;
          thumbnail_url?: string;
          features?: string[];
          tech_stack?: string[];
          complexity?: 'beginner' | 'intermediate' | 'advanced';
          is_premium?: boolean;
          download_count?: number;
          rating?: number;
          ai_prompt?: string;
          updated_at?: string;
        };
      };
      screenshots: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          url: string;
          analysis_result: any;
          created_at: string;
          is_processed: boolean;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          url: string;
          analysis_result?: any;
          is_processed?: boolean;
        };
        Update: {
          analysis_result?: any;
          is_processed?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}