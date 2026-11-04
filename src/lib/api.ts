import { Batch, Product, LiveClass, Recording, Test, Question, TestResult, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('shije_token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'API request failed');
  }

  return res.json();
}

// 1. Auth & Onboarding API
export const authApi = {
  sendOTP: (phone: string) =>
    fetcher<{ message: string; debug_otp?: string }>('/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verifyOTP: (phone: string, otp: string, name?: string) =>
    fetcher<{ token: string; user: User; profile: any }>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, name }),
    }),

  emailLogin: (email: string, password: string) =>
    fetcher<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  completeOnboarding: (data: { target_year: number; category: string; city?: string }) =>
    fetcher('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCurrentUser: () => fetcher<{ user: User }>('/auth/me'),
};

// 2. Catalogue & Commerce API
export const catalogueApi = {
  getBatches: (targetYear?: number, category?: string) => {
    const params = new URLSearchParams();
    if (targetYear) params.append('target_year', targetYear.toString());
    if (category) params.append('category', category);
    return fetcher<{ batches: Batch[]; count: number }>(`/batches?${params.toString()}`);
  },

  getBatch: (id: string) => fetcher<Batch>(`/batches/${id}`),

  getProducts: () => fetcher<{ products: Product[]; count: number }>('/products'),

  createOrder: (productId: string) =>
    fetcher('/orders', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    }),
};

// 3. Live Classes & Recordings API
export const learningApi = {
  getLiveClasses: () => fetcher<{ classes: LiveClass[] }>('/live-classes'),
  getLiveClass: (id: string) => fetcher<LiveClass>(`/live-classes/${id}`),
  getRecordings: () => fetcher<{ recordings: Recording[] }>('/recordings'),
  getRecording: (id: string) => fetcher<Recording>(`/recordings/${id}`),
};

// 4. NEET CBT Tests API
export const assessmentApi = {
  getTests: (batchId?: string) =>
    fetcher<{ tests: Test[]; count: number }>(`/tests${batchId ? `?batch_id=${batchId}` : ''}`),

  getQuestions: (testId: string) =>
    fetcher<{ test_id: string; questions: Question[] }>(`/tests/${testId}`),

  startTest: (testId: string) =>
    fetcher<{ id: string; test_id: string; status: string }>(`/tests/${testId}/start`, {
      method: 'POST',
    }),

  submitTest: (testId: string, attemptId: string, answers: any[]) =>
    fetcher<TestResult>(`/tests/${testId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ attempt_id: attemptId, answers }),
    }),
};
