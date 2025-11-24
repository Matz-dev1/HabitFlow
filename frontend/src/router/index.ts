import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardPage from '../pages/DashboardPage.vue';
import NotFound from '../pages/NotFound.vue';
import ApiUsagePage from '@/pages/ApiUsagePage.vue';
import UsersPage from '@/pages/UsersPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardPage },
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
  // Import store dynamicznie, żeby uniknąć circular dependency
  import('../store').then(({ useAuthStore }) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    // Jeśli użytkownik jest zalogowany i próbuje wejść na login/register
    if (isAuthenticated && to.path === '/login-form') {
      next('/dashboard');
    } else {
      next();
    }
  });
});

export default router;
