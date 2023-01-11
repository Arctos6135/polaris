import type { Section } from "$lib/types";

export interface Database {
  public: {
    Tables: {
      forms: {
        Row: {
          id: number;
          name: string;
          sections: Section[];
          team: string;
        };
        Insert: {
          id?: number;
          name?: string;
          sections: Section[];
          team: string;
        };
        Update: {
          id?: number;
          name?: string;
          sections?: Section[];
          team?: string;
        };
      };
      responses: {
        Row: {
          data: Record<string, string | number>;
          form: number;
          id: number;
          name: string;
          scout: string;
          team: string;
        };
        Insert: {
          data: Record<string, string | number>;
          form: number;
          id: number;
          name: string;
          scout: string;
          team: string;
        };
        Update: {
          data?: Record<string, string | number>;
          form?: number;
          id?: number;
          name?: string;
          scout?: string;
          team?: string;
        };
      };
      scouts: {
        Row: {
          accepted: boolean;
          admin: boolean;
          id: string;
          name: string;
          email: string;
          team: string;
        };
        Insert: {
          accepted?: boolean;
          admin?: boolean;
          id: string;
          name: string;
          email: string;
          team: string;
        };
        Update: {
          accepted?: boolean;
          admin?: boolean;
          id?: string;
          name?: string;
          email?: string;
          team?: string;
        };
      };
      teams: {
        Row: {
          email: string;
          team_id: string;
          team_name: string;
          verified: boolean;
        };
        Insert: {
          email: string;
          team_id: string;
          team_name: string;
          verified?: boolean;
        };
        Update: {
          email?: string;
          team_id?: string;
          team_name?: string;
          verified?: boolean;
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
