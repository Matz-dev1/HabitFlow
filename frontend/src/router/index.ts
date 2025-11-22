import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardPage from '../pages/DashboardPage.vue';
import NotFound from '../pages/NotFound.vue';
import ApiUsagePage from '@/pages/ApiUsagePage.vue';
import UsersPage from '@/pages/UsersPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardPage },
  { path: '/api-usage', component: ApiUsagePage },
  { path: '/users', component: UsersPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
