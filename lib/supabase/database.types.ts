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
      domain_offers: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          domain: string
          email: string
          id: string
          token: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          domain: string
          email: string
          id?: string
          token?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          domain?: string
          email?: string
          id?: string
          token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_offers_domain_fkey"
            columns: ["domain"]
            isOneToOne: false
            referencedRelation: "domain_stats"
            referencedColumns: ["domain"]
          },
          {
            foreignKeyName: "domain_offers_domain_fkey"
            columns: ["domain"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["domain"]
          },
        ]
      }
      domains: {
        Row: {
          created_at: string | null
          domain: string
          metadata: Json | null
          notification_frequencies:
            | Database["public"]["Enums"]["notification_frequency"][]
            | null
          notification_threshold: number | null
          user_id: string | null
          vercel_project_id: string | null
          verification_details: Json | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          metadata?: Json | null
          notification_frequencies?:
            | Database["public"]["Enums"]["notification_frequency"][]
            | null
          notification_threshold?: number | null
          user_id?: string | null
          vercel_project_id?: string | null
          verification_details?: Json | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          metadata?: Json | null
          notification_frequencies?:
            | Database["public"]["Enums"]["notification_frequency"][]
            | null
          notification_threshold?: number | null
          user_id?: string | null
          vercel_project_id?: string | null
          verification_details?: Json | null
          verified?: boolean | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: number
          metadata: Json | null
          page_url: string
          user_id: string | null
          view_timestamp: string | null
        }
        Insert: {
          id?: never
          metadata?: Json | null
          page_url: string
          user_id?: string | null
          view_timestamp?: string | null
        }
        Update: {
          id?: never
          metadata?: Json | null
          page_url?: string
          user_id?: string | null
          view_timestamp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          notification_email: string | null
          notification_frequency:
            | Database["public"]["Enums"]["notification_frequency"]
            | null
          notification_minimum_amount: number | null
          subscription_status: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          notification_email?: string | null
          notification_frequency?:
            | Database["public"]["Enums"]["notification_frequency"]
            | null
          notification_minimum_amount?: number | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          notification_email?: string | null
          notification_frequency?:
            | Database["public"]["Enums"]["notification_frequency"]
            | null
          notification_minimum_amount?: number | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          created_at: string | null
          email: string
          expiration_date: string | null
          id: string
          metadata: Json | null
          product_type: Database["public"]["Enums"]["product_type"]
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expiration_date?: string | null
          id?: string
          metadata?: Json | null
          product_type: Database["public"]["Enums"]["product_type"]
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expiration_date?: string | null
          id?: string
          metadata?: Json | null
          product_type?: Database["public"]["Enums"]["product_type"]
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      domain_stats: {
        Row: {
          avg_offer: number | null
          domain: string | null
          last_offer: string | null
          offer_count: number | null
          top_offer: number | null
          visits: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_frequency: "daily" | "weekly" | "on_demand" | "never"
      product_type: "subscription" | "template" | "other"
      subscription_tier: "basic" | "premium" | "professional" | "template"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
