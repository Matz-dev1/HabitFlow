import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardPage from '../pages/DashboardPage.vue';
import NotFound from '../pages/NotFound.vue';
import ApiUsagePage from '@/pages/ApiUsagePage.vue';
import UsersPage from '@/pages/UsersPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import { useAuthStore } from '../store';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    meta: { requiresAuth: true },
    component: DashboardPage,
  },
  { path: '/api-usage', component: ApiUsagePage },
  { path: '/users', component: UsersPage },
  { path: '/login-form', component: LoginPage },
  { path: '/register-form', component: RegisterPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guards - przekierowanie zalogowanych użytkowników z login/register
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Jeśli route wymaga autentykacji, sprawdź czy użytkownik jest zalogowany
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Przekieruj do strony logowania z zapisaną lokalizacją
    return next({
      path: '/login-form',
      query: { redirect: to.fullPath },
    });
  }

  // Jeśli użytkownik jest zalogowany i próbuje wejść na login/register, przekieruj do dashboard
  if (
    isAuthenticated &&
    (to.path === '/login-form' || to.path === '/register-form')
  ) {
    return next('/dashboard');
  }

  // W przeciwnym razie kontynuuj nawigację
  next();
});

export default router;
