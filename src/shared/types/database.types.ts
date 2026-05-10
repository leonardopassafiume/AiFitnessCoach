export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          strava_activity_id: number;
          name: string | null;
          sport_type: string | null;
          start_date: string | null;
          distance_m: number | null;
          moving_time_s: number | null;
          elapsed_time_s: number | null;
          total_elevation_gain_m: number | null;
          average_speed_mps: number | null;
          max_speed_mps: number | null;
          average_heartrate: number | null;
          max_heartrate: number | null;
          calories: number | null;
          raw: Json | null;
          created_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["activities"]["Row"]> & {
          user_id: string;
          strava_activity_id: number;
        };
        Update: Partial<Database["public"]["Tables"]["activities"]["Row"]>;
      };
      meals: {
        Row: {
          id: string;
          user_id: string;
          meal_type: string | null;
          input_type: string | null;
          input_text: string | null;
          media_url: string | null;
          eaten_at: string | null;
          estimated_calories: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          confidence: number | null;
          raw_ai_response: Json | null;
          created_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["meals"]["Row"]> & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["meals"]["Row"]>;
      };
    };
  };
};
