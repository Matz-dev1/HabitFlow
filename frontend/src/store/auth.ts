import { defineStore } from 'pinia';
import router from '../router';
import {
  AUTH_CONSTANTS,
  User,
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth';

// Mock functions dla testów (usunąć gdy backend będzie gotowy)
const mockRegister = async (
  credentials: RegisterCredentials
): Promise<{ token: string; user: User }> => {
  // Symulacja opóźnienia sieci
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    token: `mock_token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    user: {
      id: `user_${Date.now()}`,
      email: credentials.email,
      name: credentials.email.split('@')[0],
      role: 'user',
    },
  };
};

const mockLogin = async (
  credentials: LoginCredentials
): Promise<{ token: string; user: User }> => {
  // Symulacja opóźnienia sieci
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    token: `mock_token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    user: {
      id: `user_${Date.now()}`,
      email: credentials.email,
      name: credentials.email.split('@')[0],
      role: 'user',
    },
  };
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userEmail: (state) => state.user?.email || null,
    userName: (state) => state.user?.name || state.user?.email || null,
  },

  actions: {
    // Inicjalizacja z localStorage
    init() {
      const storedToken = localStorage.getItem(
        AUTH_CONSTANTS.TOKEN_STORAGE_KEY
      );
      const storedUser = localStorage.getItem(AUTH_CONSTANTS.USER_STORAGE_KEY);

      if (storedToken && storedUser) {
        this.token = storedToken;
        try {
          this.user = JSON.parse(storedUser);
        } catch {
          this.logout();
        }
      }
    },

    // Logowanie
    async login(credentials: LoginCredentials): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        let data: { token: string; user: User };

        if (AUTH_CONSTANTS.USE_MOCK_API) {
          // Mock response dla testów
          data = await mockLogin(credentials);
        } else {
          // Prawdziwe API call
          const response = await fetch(AUTH_CONSTANTS.API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Login failed');
          }

          data = await response.json();
        }

        this.token = data.token;
        this.user = data.user;

        // Zapis do localStorage
        if (this.token && this.user) {
          localStorage.setItem(AUTH_CONSTANTS.TOKEN_STORAGE_KEY, this.token);
          localStorage.setItem(
            AUTH_CONSTANTS.USER_STORAGE_KEY,
            JSON.stringify(this.user)
          );
        }

        // Przekierowanie do dashboard
        router.push('/dashboard');
      } catch (err: any) {
        this.error = err.message || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Rejestracja
    async register(credentials: RegisterCredentials): Promise<void> {
      this.loading = true;
      this.error = null;

      // Sprawdzenie czy hasła się zgadzają
      if (credentials.password !== credentials.confirmPassword) {
        const error = 'Passwords do not match';
        this.error = error;
        this.loading = false;
        throw new Error(error);
      }

      try {
        let data: { token: string; user: User };

        if (AUTH_CONSTANTS.USE_MOCK_API) {
          // Mock response dla testów
          data = await mockRegister(credentials);
        } else {
          // Prawdziwe API call
          const response = await fetch(AUTH_CONSTANTS.API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Registration failed');
          }

          data = await response.json();
        }

        this.token = data.token;
        this.user = data.user;

        // Zapis do localStorage
        if (this.token && this.user) {
          localStorage.setItem(AUTH_CONSTANTS.TOKEN_STORAGE_KEY, this.token);
          localStorage.setItem(
            AUTH_CONSTANTS.USER_STORAGE_KEY,
            JSON.stringify(this.user)
          );
        }

        // Nie przekierowujemy automatycznie - komponent obsłuży to sam
      } catch (err: any) {
        this.error = err.message || 'Registration failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Wylogowanie
    logout(): void {
      this.user = null;
      this.token = null;
      this.error = null;

      // Usunięcie z localStorage
      localStorage.removeItem(AUTH_CONSTANTS.TOKEN_STORAGE_KEY);
      localStorage.removeItem(AUTH_CONSTANTS.USER_STORAGE_KEY);

      // Przekierowanie do logowania
      router.push('/login-form');
    },

    // Sprawdzenie autentykacji
    async checkAuth(): Promise<boolean> {
      if (!this.token) {
        return false;
      }

      // TODO: Opcjonalnie sprawdź czy token jest jeszcze ważny
      return true;
    },

    // Wyczyść błędy
    clearError(): void {
      this.error = null;
    },
  },
});
