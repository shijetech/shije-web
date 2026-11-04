export type UserRole = 'student' | 'teacher' | 'admin' | 'instructor';

export type StudentCategory = 'class_11' | 'class_12' | 'dropper';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  targetYear: number;
  category: StudentCategory;
  city?: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  code?: string;
}

export interface Batch {
  id: string;
  course_id: string;
  name: string;
  slug: string;
  target_year: number;
  category: StudentCategory;
  start_date: string;
  end_date: string;
  status: 'draft' | 'published' | 'paused' | 'archived';
  is_featured: boolean;
  subjects?: Subject[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  type: 'batch_subscription' | 'test_series' | 'recorded_course';
  price: number;
  currency: string;
  validity_type: 'fixed_duration' | 'session_end';
  validity_days?: number;
  validity_end_date?: string;
  is_active: boolean;
  inclusions?: string[];
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
}

export interface Entitlement {
  id: string;
  user_id: string;
  product_id?: string;
  batch_id: string;
  starts_at: string;
  expires_at: string;
  status: 'active' | 'expired' | 'revoked';
}

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor_name?: string;
  course_id: string;
  batch_id?: string;
  subject_id?: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  stream_url?: string;
  viewer_count?: number;
}

export interface Recording {
  id: string;
  title: string;
  description: string;
  course_id: string;
  batch_id?: string;
  duration_seconds: number;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
  chapters?: Array<{
    title: string;
    timestamp_seconds: number;
  }>;
}

export interface Question {
  id: string;
  subject_id: string;
  chapter_id?: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option?: 'A' | 'B' | 'C' | 'D';
  marks: number;
  negative_marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Test {
  id: string;
  batch_id: string;
  title: string;
  test_type: 'chapter' | 'subject' | 'full_mock' | 'practice';
  duration_minutes: number;
  total_marks: number;
  window_start: string;
  window_end: string;
  solution_release_policy: 'immediate' | 'after_window' | 'manual';
  status: 'draft' | 'published' | 'archived';
  question_count: number;
}

export interface TestResult {
  id: string;
  attempt_id: string;
  student_id: string;
  test_id: string;
  total_score: number;
  total_correct: number;
  total_incorrect: number;
  total_unattempted: number;
  accuracy_percentage: number;
  generated_at: string;
}
