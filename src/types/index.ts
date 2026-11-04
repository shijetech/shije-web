export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  courseId: string;
  courseTitle: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'upcoming' | 'live' | 'ended';
  streamUrl?: string;
  viewerCount?: number;
}

export interface Recording {
  id: string;
  title: string;
  description: string;
  courseId: string;
  durationSeconds: number;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  chapters?: Array<{
    title: string;
    timestampSeconds: number;
  }>;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  instructorName: string;
  price: number;
  liveClassesCount: number;
  recordingsCount: number;
}
