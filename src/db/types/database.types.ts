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
      campaign_messages: {
        Row: {
          campaign_id: string | null
          company_id: string | null
          content: string | null
          created_at: string
          file_url: string | null
          id: number
          order_index: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          company_id?: string | null
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: number
          order_index?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          company_id?: string | null
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: number
          order_index?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_messages_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          company_id: string | null
          created_at: string
          end_date: string | null
          id: string
          redirect_to: number | null
          start_date: string | null
          title: string | null
          updated_at: string | null
          wp_link: string | null
          wp_message: string | null
          wp_numbers: string[] | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          redirect_to?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
          wp_link?: string | null
          wp_message?: string | null
          wp_numbers?: string[] | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          redirect_to?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
          wp_link?: string | null
          wp_message?: string | null
          wp_numbers?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      company: {
        Row: {
          created_at: string
          id: string
          kiwify_subscription_id: string | null
          name: string | null
          plan: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kiwify_subscription_id?: string | null
          name?: string | null
          plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kiwify_subscription_id?: string | null
          name?: string | null
          plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kiwify: {
        Row: {
          created_at: string
          customer_city: string | null
          customer_email: string | null
          customer_first_name: string | null
          customer_full_name: string | null
          customer_mobile: string | null
          customer_state: string | null
          id: string
          order_status: string | null
          subscription_id: string | null
          subscription_next_payment: string | null
          subscription_plan_name: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          customer_city?: string | null
          customer_email?: string | null
          customer_first_name?: string | null
          customer_full_name?: string | null
          customer_mobile?: string | null
          customer_state?: string | null
          id?: string
          order_status?: string | null
          subscription_id?: string | null
          subscription_next_payment?: string | null
          subscription_plan_name?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          customer_city?: string | null
          customer_email?: string | null
          customer_first_name?: string | null
          customer_full_name?: string | null
          customer_mobile?: string | null
          customer_state?: string | null
          id?: string
          order_status?: string | null
          subscription_id?: string | null
          subscription_next_payment?: string | null
          subscription_plan_name?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          company_id: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp: {
        Row: {
          battery: string | null
          campaign_id: string | null
          company_id: string | null
          created_at: string
          id: string
          name: string | null
          plugged: boolean | null
          qr_code: string | null
          retries: number | null
          session: string | null
          status: string | null
          token: string | null
          updated_at: string | null
        }
        Insert: {
          battery?: string | null
          campaign_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          plugged?: boolean | null
          qr_code?: string | null
          retries?: number | null
          session?: string | null
          status?: string | null
          token?: string | null
          updated_at?: string | null
        }
        Update: {
          battery?: string | null
          campaign_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          plugged?: boolean | null
          qr_code?: string | null
          retries?: number | null
          session?: string | null
          status?: string | null
          token?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_tracking: {
        Row: {
          campaign_id: string | null
          city: string | null
          country: string | null
          created_at: string
          device_size: string | null
          device_system: string | null
          id: string
          link: string | null
          number: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_size?: string | null
          device_system?: string | null
          id?: string
          link?: string | null
          number?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_size?: string | null
          device_system?: string | null
          id?: string
          link?: string | null
          number?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_tracking_project_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["user_id"]
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
