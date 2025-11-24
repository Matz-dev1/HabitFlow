export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  TOKEN_STORAGE_KEY: 'auth_token',
  USER_STORAGE_KEY: 'auth_user',
  // Ustaw na false gdy backend będzie gotowy
  USE_MOCK_API: true,
  API_ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
} as const;

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}
