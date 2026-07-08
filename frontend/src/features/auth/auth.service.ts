import api from '../../services/api';
import type { AuthUser } from '../../utils/types';

export async function loginRequest(email: string, password: string): Promise<AuthUser> {
  const response = await api.post('/auth/login', { email, password });
  return response.data.user;
}

export async function logoutRequest(): Promise<void> {
  await api.post('/auth/logout');
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await api.get('/me');
    return response.data.user;
  } catch {
    return null;
  }
}
