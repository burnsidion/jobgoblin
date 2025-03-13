import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserHomeView from '@/views/UserHomeView.vue';
import { supabase } from '@/utilities/supabaseClient';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'homeView',
      component: UserHomeView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.warn('🚨 Unauthorized access attempt! Redirecting to home.');
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
