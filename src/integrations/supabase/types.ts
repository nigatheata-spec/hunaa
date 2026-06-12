export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assistant_conversations: {
        Row: {
          child_id: string | null
          created_at: string
          family_role: string | null
          id: string
          messages: Json
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id?: string | null
          created_at?: string
          family_role?: string | null
          id?: string
          messages?: Json
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string | null
          created_at?: string
          family_role?: string | null
          id?: string
          messages?: Json
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_conversations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age: number | null
          assessment: Json | null
          assessment_completed_at: string | null
          avatar_url: string | null
          created_at: string
          gender: string | null
          id: string
          interests: string | null
          name: string
          notes: string | null
          parent_id: string
          traits: string | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          assessment?: Json | null
          assessment_completed_at?: string | null
          avatar_url?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          interests?: string | null
          name: string
          notes?: string | null
          parent_id: string
          traits?: string | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          assessment?: Json | null
          assessment_completed_at?: string | null
          avatar_url?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          interests?: string | null
          name?: string
          notes?: string | null
          parent_id?: string
          traits?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_requests: {
        Row: {
          ai_summary: string | null
          ai_tags: string[] | null
          audience: string | null
          cluster_id: string | null
          created_at: string
          family_role: Database["public"]["Enums"]["family_role"] | null
          id: string
          raw_request: string
          status: string
          topic: string | null
          track: string | null
          user_id: string | null
        }
        Insert: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          audience?: string | null
          cluster_id?: string | null
          created_at?: string
          family_role?: Database["public"]["Enums"]["family_role"] | null
          id?: string
          raw_request: string
          status?: string
          topic?: string | null
          track?: string | null
          user_id?: string | null
        }
        Update: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          audience?: string | null
          cluster_id?: string | null
          created_at?: string
          family_role?: Database["public"]["Enums"]["family_role"] | null
          id?: string
          raw_request?: string
          status?: string
          topic?: string | null
          track?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_email: string | null
          donor_name: string | null
          id: string
          message: string | null
          provider: string | null
          provider_payment_id: string | null
          status: string
          tier: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          message?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          status?: string
          tier?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          message?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          status?: string
          tier?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      episodes: {
        Row: {
          created_at: string
          duration_minutes: number | null
          episode_number: number
          id: string
          name: string | null
          season: number
          synopsis: string | null
          title_id: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          episode_number: number
          id?: string
          name?: string | null
          season?: number
          synopsis?: string | null
          title_id: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          episode_number?: number
          id?: string
          name?: string | null
          season?: number
          synopsis?: string | null
          title_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      influencers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          system_prompt: string
          tagline: string | null
          target_roles: Database["public"]["Enums"]["family_role"][] | null
          voice_style: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          system_prompt: string
          tagline?: string | null
          target_roles?: Database["public"]["Enums"]["family_role"][] | null
          voice_style?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          system_prompt?: string
          tagline?: string | null
          target_roles?: Database["public"]["Enums"]["family_role"][] | null
          voice_style?: string | null
        }
        Relationships: []
      }
      payment_gateways: {
        Row: {
          code: string
          config: Json | null
          created_at: string
          id: string
          is_enabled: boolean
          name: string
        }
        Insert: {
          code: string
          config?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          name: string
        }
        Update: {
          code?: string
          config?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          name?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          code: string
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          is_active: boolean
          max_profiles: number
          name: string
          price_monthly: number
          price_yearly: number | null
          sort_order: number | null
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          is_active?: boolean
          max_profiles?: number
          name: string
          price_monthly: number
          price_yearly?: number | null
          sort_order?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          is_active?: boolean
          max_profiles?: number
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          family_role: Database["public"]["Enums"]["family_role"] | null
          father_avatar_url: string | null
          id: string
          mother_avatar_url: string | null
          preferred_tracks: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          family_role?: Database["public"]["Enums"]["family_role"] | null
          father_avatar_url?: string | null
          id: string
          mother_avatar_url?: string | null
          preferred_tracks?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          family_role?: Database["public"]["Enums"]["family_role"] | null
          father_avatar_url?: string | null
          id?: string
          mother_avatar_url?: string | null
          preferred_tracks?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_percent: number | null
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          uses: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          uses?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          uses?: number
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          child_id: string | null
          created_at: string
          family_member: string | null
          id: string
          reason: string | null
          suggested_kind: string | null
          suggested_title: string | null
          title_id: string | null
          topic: string | null
          user_id: string
        }
        Insert: {
          child_id?: string | null
          created_at?: string
          family_member?: string | null
          id?: string
          reason?: string | null
          suggested_kind?: string | null
          suggested_title?: string | null
          title_id?: string | null
          topic?: string | null
          user_id: string
        }
        Update: {
          child_id?: string | null
          created_at?: string
          family_member?: string | null
          id?: string
          reason?: string | null
          suggested_kind?: string | null
          suggested_title?: string | null
          title_id?: string | null
          topic?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          plan_id: string | null
          provider: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      titles: {
        Row: {
          age_rating: string | null
          audience: string[] | null
          backdrop_url: string | null
          badges: string[] | null
          cast_crew: Json | null
          created_at: string
          duration_minutes: number | null
          id: string
          is_published: boolean
          kind: Database["public"]["Enums"]["title_kind"]
          long_description: string | null
          poster_url: string | null
          slug: string | null
          stars: string[] | null
          synopsis: string | null
          target_roles: Database["public"]["Enums"]["family_role"][] | null
          title: string
          track: string | null
          trailer_url: string | null
          updated_at: string
        }
        Insert: {
          age_rating?: string | null
          audience?: string[] | null
          backdrop_url?: string | null
          badges?: string[] | null
          cast_crew?: Json | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          kind: Database["public"]["Enums"]["title_kind"]
          long_description?: string | null
          poster_url?: string | null
          slug?: string | null
          stars?: string[] | null
          synopsis?: string | null
          target_roles?: Database["public"]["Enums"]["family_role"][] | null
          title: string
          track?: string | null
          trailer_url?: string | null
          updated_at?: string
        }
        Update: {
          age_rating?: string | null
          audience?: string[] | null
          backdrop_url?: string | null
          badges?: string[] | null
          cast_crew?: Json | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          kind?: Database["public"]["Enums"]["title_kind"]
          long_description?: string | null
          poster_url?: string | null
          slug?: string | null
          stars?: string[] | null
          synopsis?: string | null
          target_roles?: Database["public"]["Enums"]["family_role"][] | null
          title?: string
          track?: string | null
          trailer_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      family_role: "father" | "mother" | "son" | "daughter"
      title_kind: "movie" | "series" | "reel" | "influencer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      family_role: ["father", "mother", "son", "daughter"],
      title_kind: ["movie", "series", "reel", "influencer"],
    },
  },
} as const
