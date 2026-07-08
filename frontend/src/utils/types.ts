export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export type BlogStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Blog {
  id: number;
  title: string;
  content: string;
  status: BlogStatus;
  author_id: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_email?: string;
}
