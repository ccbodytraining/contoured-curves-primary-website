import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

// (Other interfaces like CourseModule, Enrollment, etc. stay the same as your original — keep those)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.warn('Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase Anon Key is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Database Service
export class DatabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = supabase;
  }

  private handleSupabaseError({ error, data }: { error: any; data: any }, context: string) {
    if (error) {
      console.error(`Supabase error in ${context}:`, error);
      throw new Error(`Database operation failed in ${context}: ${error.message}`);
    }
    return data;
  }

  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await this.client
      .from('courses')
      .select('*')
      .order('id');
    this.handleSupabaseError({ error, data }, 'getAllCourses');
    return data as Course[] || [];
  }

  // ⏩ Add more methods as needed
}

export const dbService = new DatabaseService();

// Optional fallback function — NOT used anymore
export function getCloudflareContext() {
  return {
    ip: '0.0.0.0',
    userAgent: 'mock-user-agent',
    location: 'local',
  };
}
