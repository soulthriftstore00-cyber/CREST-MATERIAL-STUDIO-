export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };

  public: {
    Tables: {
      catalogues: {
        Row: {
          active: boolean;
          created_at: string;
          download_count: number;
          file_url: string;
          id: string;
          title: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          download_count?: number;
          file_url: string;
          id?: string;
          title: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          download_count?: number;
          file_url?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };

      categories: {
        Row: {
          active: boolean;
          cover_image: string | null;
          created_at: string;
          description: string;
          display_order: number;
          id: string;
          name: string;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
        };
        Insert: {
          active?: boolean;
          cover_image?: string | null;
          created_at?: string;
          description?: string;
          display_order?: number;
          id?: string;
          name: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
        };
        Update: {
          active?: boolean;
          cover_image?: string | null;
          created_at?: string;
          description?: string;
          display_order?: number;
          id?: string;
          name?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
        };
        Relationships: [];
      };

      enquiries: {
        Row: {
          company: string | null;
          created_at: string;
          delivery_location: string | null;
          email: string | null;
          id: string;
          message: string | null;
          name: string;
          notes: string | null;
          phone: string;
          product_id: string | null;
          product_name: string | null;
          quantity: number;
          required_date: string | null;
          status: Database["public"]["Enums"]["enquiry_status"];
          whatsapp: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          delivery_location?: string | null;
          email?: string | null;
          id?: string;
          message?: string | null;
          name: string;
          notes?: string | null;
          phone: string;
          product_id?: string | null;
          product_name?: string | null;
          quantity?: number;
          required_date?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          whatsapp?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          delivery_location?: string | null;
          email?: string | null;
          id?: string;
          message?: string | null;
          name?: string;
          notes?: string | null;
          phone?: string;
          product_id?: string | null;
          product_name?: string | null;
          quantity?: number;
          required_date?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          whatsapp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enquiries_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };

      product_images: {
        Row: {
          alt_text: string;
          display_order: number;
          id: string;
          is_primary: boolean;
          product_id: string;
          url: string;
        };
        Insert: {
          alt_text?: string;
          display_order?: number;
          id?: string;
          is_primary?: boolean;
          product_id: string;
          url: string;
        };
        Update: {
          alt_text?: string;
          display_order?: number;
          id?: string;
          is_primary?: boolean;
          product_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };

      products: {
        Row: {
          applications: string[];
          bulk_available: boolean;
          category_id: string | null;
          code: string;
          colour: string | null;
          created_at: string;
          description: string;
          featured: boolean;
          finish: string | null;
          id: string;
          image_url: string | null;
          material: string | null;
          moq: number;
          mrp: number | null;
          name: string;
          price: number | null;
          published: boolean;
          seo_description: string | null;
          seo_title: string | null;
          short_description: string;
          size: string | null;
          slug: string;
          stock_quantity: number;
          stock_status: Database["public"]["Enums"]["stock_status"];
          tags: string[];
          thickness: string | null;
          updated_at: string;
        };
        Insert: {
          applications?: string[];
          bulk_available?: boolean;
          category_id?: string | null;
          code: string;
          colour?: string | null;
          created_at?: string;
          description?: string;
          featured?: boolean;
          finish?: string | null;
          id?: string;
          image_url?: string | null;
          material?: string | null;
          moq?: number;
          mrp?: number | null;
          name: string;
          price?: number | null;
          published?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description?: string;
          size?: string | null;
          slug: string;
          stock_quantity?: number;
          stock_status?: Database["public"]["Enums"]["stock_status"];
          tags?: string[];
          thickness?: string | null;
          updated_at?: string;
        };
        Update: {
          applications?: string[];
          bulk_available?: boolean;
          category_id?: string | null;
          code?: string;
          colour?: string | null;
          created_at?: string;
          description?: string;
          featured?: boolean;
          finish?: string | null;
          id?: string;
          image_url?: string | null;
          material?: string | null;
          moq?: number;
          mrp?: number | null;
          name?: string;
          price?: number | null;
          published?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description?: string;
          size?: string | null;
          slug?: string;
          stock_quantity?: number;
          stock_status?: Database["public"]["Enums"]["stock_status"];
          tags?: string[];
          thickness?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      projects: {
        Row: {
          application: string;
          description: string;
          display_order: number;
          id: string;
          image_url: string | null;
          location: string | null;
          published: boolean;
          slug: string;
          title: string;
        };
        Insert: {
          application: string;
          description?: string;
          display_order?: number;
          id?: string;
          image_url?: string | null;
          location?: string | null;
          published?: boolean;
          slug: string;
          title: string;
        };
        Update: {
          application?: string;
          description?: string;
          display_order?: number;
          id?: string;
          image_url?: string | null;
          location?: string | null;
          published?: boolean;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };

      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };

      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      claim_initial_admin: {
        Args: never;
        Returns: boolean;
      };

      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };

    Enums: {
      app_role: "admin" | "editor";
      enquiry_status:
        | "new"
        | "contacted"
        | "quoted"
        | "converted"
        | "closed";
      stock_status:
        | "in_stock"
        | "low_stock"
        | "out_of_stock"
        | "coming_soon"
        | "made_to_order";
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<
  Database,
  "__InternalSupabase"
>;

type DefaultSchema = DatabaseWithoutInternals[
  Extract<keyof Database, "public">
];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof (
          DatabaseWithoutInternals[
            DefaultSchemaTableNameOrOptions["schema"]
          ]["Tables"] &
          DatabaseWithoutInternals[
            DefaultSchemaTableNameOrOptions["schema"]
          ]["Views"]
        )
      : never
  ) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (
      DatabaseWithoutInternals[
        DefaultSchemaTableNameOrOptions["schema"]
      ]["Tables"] &
      DatabaseWithoutInternals[
        DefaultSchemaTableNameOrOptions["schema"]
      ]["Views"]
    )[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (
      DefaultSchema["Tables"] & DefaultSchema["Views"]
    )
    ? (
        DefaultSchema["Tables"] &
        DefaultSchema["Views"]
      )[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Tables"]
      : never
  ) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[
      DefaultSchemaTableNameOrOptions["schema"]
    ]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][
        DefaultSchemaTableNameOrOptions
      ] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Tables"]
      : never
  ) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[
      DefaultSchemaTableNameOrOptions["schema"]
    ]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][
        DefaultSchemaTableNameOrOptions
      ] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (
    DefaultSchemaEnumNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaEnumNameOrOptions["schema"]
        ]["Enums"]
      : never
  ) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[
      DefaultSchemaEnumNameOrOptions["schema"]
    ]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (
    PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          PublicCompositeTypeNameOrOptions["schema"]
        ]["CompositeTypes"]
      : never
  ) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[
      PublicCompositeTypeNameOrOptions["schema"]
    ]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      enquiry_status: [
        "new",
        "contacted",
        "quoted",
        "converted",
        "closed",
      ],
      stock_status: [
        "in_stock",
        "low_stock",
        "out_of_stock",
        "coming_soon",
        "made_to_order",
      ],
    },
  },
} as const;
