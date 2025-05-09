import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define interfaces for database tables (can remain largely the same)
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

export interface CourseModule {
  id: number;
  course_id: number;
  title: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface CourseLesson {
  id: number;
  module_id: number;
  title: string;
  content: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  completed_at: string | null;
  certificate_issued: boolean;
}

export interface UserProgress {
  id: number;
  user_id: number;
  lesson_id: number;
  completed: boolean;
  completed_at: string | null;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  course_id: number;
  price: number;
}

export interface DiscountCode {
  id: number;
  code: string;
  discount_percent: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface Certificate {
  id: number;
  user_id: number;
  course_id: number;
  certificate_number: string;
  issued_at: string;
}

// Initialize Supabase client
// These will be replaced by environment variables in Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Ensure URL and Key are provided
if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.warn('Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL environment variable.');
}
if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase Anon Key is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Database service class using Supabase
export class DatabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = supabase; // Use the shared client instance
  }

  // Helper to handle Supabase errors
  private handleSupabaseError({ error, data }: { error: any; data: any }, context: string) {
    if (error) {
      console.error(`Supabase error in ${context}:`, error);
      throw new Error(`Database operation failed in ${context}: ${error.message}`);
    }
    return data;
  }

  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single(); // Use .single() if email is unique
    this.handleSupabaseError({ error, data }, 'getUserByEmail');
    return data as User | null;
  }

  async createUser(name: string, email: string, passwordHash: string): Promise<number> {
    const { data, error } = await this.client
      .from('users')
      .insert([{ name, email, password_hash: passwordHash }])
      .select('id')
      .single();
    this.handleSupabaseError({ error, data }, 'createUser');
    return data?.id || 0;
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await this.client
      .from('courses')
      .select('*')
      .order('id');
    this.handleSupabaseError({ error, data }, 'getAllCourses');
    return data as Course[] || [];
  }

  async getCourseById(id: number): Promise<Course | null> {
    const { data, error } = await this.client
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    this.handleSupabaseError({ error, data }, 'getCourseById');
    return data as Course | null;
  }

  // Course modules and lessons
  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    const { data, error } = await this.client
      .from('course_modules')
      .select('*')
      .eq('course_id', courseId)
      .order('position');
    this.handleSupabaseError({ error, data }, 'getCourseModules');
    return data as CourseModule[] || [];
  }

  async getModuleLessons(moduleId: number): Promise<CourseLesson[]> {
    const { data, error } = await this.client
      .from('course_lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('position');
    this.handleSupabaseError({ error, data }, 'getModuleLessons');
    return data as CourseLesson[] || [];
  }

  // Enrollment methods
  async enrollUserInCourse(userId: number, courseId: number): Promise<number> {
    const { data, error } = await this.client
      .from('enrollments')
      .insert([{ user_id: userId, course_id: courseId }])
      .select('id')
      .single();
    this.handleSupabaseError({ error, data }, 'enrollUserInCourse');
    return data?.id || 0;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    const { data, error } = await this.client
      .from('enrollments')
      .select('*')
      .eq('user_id', userId);
    this.handleSupabaseError({ error, data }, 'getUserEnrollments');
    return data as Enrollment[] || [];
  }

  // User progress methods
  async updateLessonProgress(userId: number, lessonId: number, completed: boolean): Promise<void> {
    const now = new Date().toISOString();
    const { error, data } = await this.client
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: completed,
        completed_at: completed ? now : null,
      }, { onConflict: 'user_id,lesson_id' }); // Assumes unique constraint on (user_id, lesson_id)
    this.handleSupabaseError({ error, data }, 'updateLessonProgress');
  }

  async getUserProgress(userId: number, courseId: number): Promise<UserProgress[]> {
     // This query is more complex and might require a Supabase function or adjusted query
     // For simplicity, fetching all progress for the user first, then filtering might be needed
     // Or adjust based on how lessons/modules relate in Supabase schema
     // Example: Fetch progress for lessons belonging to the course
     const { data: lessons, error: lessonsError } = await this.client
       .from('course_lessons')
       .select('id, module_id(*)')
       .eq('module_id.course_id', courseId);

     if (lessonsError) {
       console.error('Error fetching lessons for progress:', lessonsError);
       return [];
     }

     const lessonIds = lessons?.map(l => l.id) || [];
     if (lessonIds.length === 0) return [];

     const { data, error } = await this.client
       .from('user_progress')
       .select('*')
       .eq('user_id', userId)
       .in('lesson_id', lessonIds);

     this.handleSupabaseError({ error, data }, 'getUserProgress');
     return data as UserProgress[] || [];
  }

  // Order methods
  async createOrder(userId: number, totalAmount: number): Promise<number> {
    const { data, error } = await this.client
      .from('orders')
      .insert([{ user_id: userId, total_amount: totalAmount, status: 'pending' }])
      .select('id')
      .single();
    this.handleSupabaseError({ error, data }, 'createOrder');
    return data?.id || 0;
  }

  async addOrderItem(orderId: number, courseId: number, price: number): Promise<void> {
    const { error, data } = await this.client
      .from('order_items')
      .insert([{ order_id: orderId, course_id: courseId, price: price }]);
    this.handleSupabaseError({ error, data }, 'addOrderItem');
  }

  async completeOrder(orderId: number): Promise<void> {
    const { error, data } = await this.client
      .from('orders')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', orderId);
    this.handleSupabaseError({ error, data }, 'completeOrder');
  }

  // Discount code methods
  async getDiscountCode(code: string): Promise<DiscountCode | null> {
    const now = new Date().toISOString();
    const { data, error } = await this.client
      .from('discount_codes')
      .select('*')
      .eq('code', code)
      .eq('active', true)
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .single();
    // Note: Supabase error handling might treat 'no rows' differently than D1
    if (error && error.code !== 'PGRST116') { // PGRST116 = 'Requested range not satisfiable' (means 0 rows for .single())
        console.error(`Supabase error in getDiscountCode:`, error);
        throw new Error(`Database operation failed in getDiscountCode: ${error.message}`);
    }
    return data as DiscountCode | null;
  }

  // Certificate methods
  async issueCertificate(userId: number, courseId: number): Promise<string> {
    const certificateNumber = `CC-${userId}-${courseId}-${Date.now()}`;
    
    // Insert certificate
    const { error: certError, data: certData } = await this.client
      .from('certificates')
      .insert([{ user_id: userId, course_id: courseId, certificate_number: certificateNumber }])
      .select('id')
      .single();
    this.handleSupabaseError({ error: certError, data: certData }, 'issueCertificate - insert');

    // Update enrollment
    const { error: enrollError, data: enrollData } = await this.client
      .from('enrollments')
      .update({ certificate_issued: true })
      .match({ user_id: userId, course_id: courseId });
    this.handleSupabaseError({ error: enrollError, data: enrollData }, 'issueCertificate - update enrollment');

    return certificateNumber;
  }

  async getUserCertificates(userId: number): Promise<Certificate[]> {
    const { data, error } = await this.client
      .from('certificates')
      .select('*')
      .eq('user_id', userId);
    this.handleSupabaseError({ error, data }, 'getUserCertificates');
    return data as Certificate[] || [];
  }
}

// Export a single instance for use in API routes
export const dbService = new DatabaseService();

