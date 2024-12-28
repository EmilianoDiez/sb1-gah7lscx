export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          dni: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          dni: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          dni?: string
          status?: string
          created_at?: string
        }
      }
      companions: {
        Row: {
          id: string
          user_id: string
          name: string
          dni: string
          age: number
          phone: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          dni: string
          age: number
          phone?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          dni?: string
          age?: number
          phone?: string | null
          status?: string
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          user_id: string
          date: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          status?: string
          created_at?: string
        }
      }
      reservation_companions: {
        Row: {
          id: string
          reservation_id: string
          companion_id: string
          created_at: string
        }
        Insert: {
          id?: string
          reservation_id: string
          companion_id: string
          created_at?: string
        }
        Update: {
          id?: string
          reservation_id?: string
          companion_id?: string
          created_at?: string
        }
      }
    }
  }
}