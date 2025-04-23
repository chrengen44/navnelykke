export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      baby_names: {
        Row: {
          created_at: string
          first_letter: string
          gender: string
          id: number
          length: string
          meaning: string
          name: string
          origin: string
          phonetic: string | null
          popularity: number
        }
        Insert: {
          created_at?: string
          first_letter: string
          gender: string
          id?: number
          length: string
          meaning: string
          name: string
          origin: string
          phonetic?: string | null
          popularity: number
        }
        Update: {
          created_at?: string
          first_letter?: string
          gender?: string
          id?: number
          length?: string
          meaning?: string
          name?: string
          origin?: string
          phonetic?: string | null
          popularity?: number
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          name_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      name_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: number
          name: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
          title?: string
        }
        Relationships: []
      }
      name_category_mappings: {
        Row: {
          category_id: number
          id: number
          name_id: number
        }
        Insert: {
          category_id: number
          id?: number
          name_id: number
        }
        Update: {
          category_id?: number
          id?: number
          name_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "name_category_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "name_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "name_category_mappings_name_id_fkey"
            columns: ["name_id"]
            isOneToOne: false
            referencedRelation: "baby_names"
            referencedColumns: ["id"]
          },
        ]
      }
      name_list_items: {
        Row: {
          created_at: string
          id: string
          list_id: string
          name_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          list_id: string
          name_id: number
        }
        Update: {
          created_at?: string
          id?: string
          list_id?: string
          name_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "name_list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "name_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      name_lists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "name_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      name_polls: {
        Row: {
          created_at: string
          creator_id: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_anonymous: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_anonymous?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_anonymous?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      name_visits: {
        Row: {
          id: string
          name_id: number
          user_id: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          name_id: number
          user_id?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          name_id?: number
          user_id?: string | null
          visited_at?: string
        }
        Relationships: []
      }
      poll_items: {
        Row: {
          created_at: string
          custom_name: string | null
          id: string
          name_id: number | null
          poll_id: string
        }
        Insert: {
          created_at?: string
          custom_name?: string | null
          id?: string
          name_id?: number | null
          poll_id: string
        }
        Update: {
          created_at?: string
          custom_name?: string | null
          id?: string
          name_id?: number | null
          poll_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_items_name_id_fkey"
            columns: ["name_id"]
            isOneToOne: false
            referencedRelation: "baby_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_items_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "name_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          created_at: string
          id: string
          poll_id: string
          poll_item_id: string
          voter_email: string | null
          voter_id: string | null
          voter_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          poll_id: string
          poll_item_id: string
          voter_email?: string | null
          voter_id?: string | null
          voter_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          poll_id?: string
          poll_item_id?: string
          voter_email?: string | null
          voter_id?: string | null
          voter_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "name_polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_votes_poll_item_id_fkey"
            columns: ["poll_item_id"]
            isOneToOne: false
            referencedRelation: "poll_items"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      suggested_names: {
        Row: {
          additional_info: string | null
          created_at: string
          gender: string
          id: string
          meaning: string
          name: string
          origin: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          gender: string
          id?: string
          meaning: string
          name: string
          origin: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          gender?: string
          id?: string
          meaning?: string
          name?: string
          origin?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suggested_names_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
