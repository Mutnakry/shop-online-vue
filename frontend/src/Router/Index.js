import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Slidebar from '../components/Slidebar.vue';
import Login from '../components/Login.vue';
import Index from '../pages/Index.vue';
import Register from '../components/Register.vue'

const routes = [
    {
        path: '/',
        component: Index,
        meta: { requiresAuth: false },
    },
    {
        path: '/login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/home',
        component: Home,
        meta: { requiresAuth: true }, 
    },
    {
        path: '/slidebar',
        component: Slidebar,
        meta: { requiresAuth: true },
    },
    {
        path: '/register',
        component: Register,
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Use import.meta.env.BASE_URL for Vite
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
  
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        next('/home');
    } else {
        next();
    }
});

export default router;
