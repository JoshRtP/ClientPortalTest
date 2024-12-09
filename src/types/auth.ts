export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}