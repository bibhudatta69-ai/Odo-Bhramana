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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      districts: {
        Row: {
          about: string | null
          created_at: string | null
          famous_festivals: string[] | null
          famous_foods: string[] | null
          getting_there: string | null
          highlights: string[] | null
          id: string
          image_url: string | null
          name: string
          quick_facts: string | null
          tourist_places: string[] | null
          traveller_tips: string[] | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          famous_festivals?: string[] | null
          famous_foods?: string[] | null
          getting_there?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          name: string
          quick_facts?: string | null
          tourist_places?: string[] | null
          traveller_tips?: string[] | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          famous_festivals?: string[] | null
          famous_foods?: string[] | null
          getting_there?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          name?: string
          quick_facts?: string | null
          tourist_places?: string[] | null
          traveller_tips?: string[] | null
        }
        Relationships: []
      }
      festivals: {
        Row: {
          created_at: string | null
          date_info: string | null
          description: string
          details: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          date_info?: string | null
          description: string
          details?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          date_info?: string | null
          description?: string
          details?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          created_at: string | null
          description: string
          details: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          details?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          details?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      host_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          host_id: string
          id: string
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          host_id: string
          id?: string
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          host_id?: string
          id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_photos_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "stays_hosts"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          receiver_id: string
          sender_id: string
          stay_request_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          receiver_id: string
          sender_id: string
          stay_request_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          receiver_id?: string
          sender_id?: string
          stay_request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_stay_request_id_fkey"
            columns: ["stay_request_id"]
            isOneToOne: false
            referencedRelation: "stay_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          created_at: string | null
          description: string
          details: string | null
          id: string
          image_url: string | null
          location: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          details?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          details?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          date_of_birth: string | null
          full_name: string | null
          hometown: string | null
          id: string
          interests: string[] | null
          languages_spoken: string[] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          hometown?: string | null
          id: string
          interests?: string[] | null
          languages_spoken?: string[] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          hometown?: string | null
          id?: string
          interests?: string[] | null
          languages_spoken?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: string
          rating: number
          review_text: string
          user_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating: number
          review_text: string
          user_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string
          user_name?: string
        }
        Relationships: []
      }
      saved_festivals: {
        Row: {
          created_at: string | null
          festival_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          festival_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          festival_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_festivals_festival_id_fkey"
            columns: ["festival_id"]
            isOneToOne: false
            referencedRelation: "festivals"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_foods: {
        Row: {
          created_at: string | null
          food_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          food_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          food_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_foods_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_places: {
        Row: {
          created_at: string | null
          id: string
          place_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          place_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          place_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_places_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_requests: {
        Row: {
          created_at: string | null
          host_id: string
          id: string
          message: string | null
          status: string | null
          surfer_id: string
        }
        Insert: {
          created_at?: string | null
          host_id: string
          id?: string
          message?: string | null
          status?: string | null
          surfer_id: string
        }
        Update: {
          created_at?: string | null
          host_id?: string
          id?: string
          message?: string | null
          status?: string | null
          surfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_requests_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "stays_hosts"
            referencedColumns: ["id"]
          },
        ]
      }
      stays_hosts: {
        Row: {
          address: string
          created_at: string | null
          id: string
          image_url: string | null
          interests: string[] | null
          offerings: string | null
          phone_number: string
          updated_at: string | null
          user_id: string
          work_description: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          interests?: string[] | null
          offerings?: string | null
          phone_number: string
          updated_at?: string | null
          user_id: string
          work_description?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          interests?: string[] | null
          offerings?: string | null
          phone_number?: string
          updated_at?: string | null
          user_id?: string
          work_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stays_hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surfer_reviews: {
        Row: {
          created_at: string | null
          host_id: string
          id: string
          rating: number
          review_text: string
          stay_request_id: string | null
          surfer_id: string
        }
        Insert: {
          created_at?: string | null
          host_id: string
          id?: string
          rating: number
          review_text: string
          stay_request_id?: string | null
          surfer_id: string
        }
        Update: {
          created_at?: string | null
          host_id?: string
          id?: string
          rating?: number
          review_text?: string
          stay_request_id?: string | null
          surfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "surfer_reviews_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "stays_hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "surfer_reviews_stay_request_id_fkey"
            columns: ["stay_request_id"]
            isOneToOne: false
            referencedRelation: "stay_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "surfer_reviews_surfer_id_fkey"
            columns: ["surfer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tribes: {
        Row: {
          belt_info: string | null
          communities: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          name: string
          overview: string | null
          regions: string | null
          responsible_travel: string | null
        }
        Insert: {
          belt_info?: string | null
          communities?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          name: string
          overview?: string | null
          regions?: string | null
          responsible_travel?: string | null
        }
        Update: {
          belt_info?: string | null
          communities?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          overview?: string | null
          regions?: string | null
          responsible_travel?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
