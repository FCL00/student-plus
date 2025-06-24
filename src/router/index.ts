import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import DashBoard from '@/views/DashBoard.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import NotFound from '@/views/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'index', component: LoginPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/dashboard', name: 'dashboard', component: DashBoard },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
