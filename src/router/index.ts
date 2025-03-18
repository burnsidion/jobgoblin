import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserHomeView from '@/views/UserHomeView.vue';
import { supabase } from '@/utilities/supabaseClient';
import NewApplicationView from '@/views/NewApplicationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/home', name: 'homeView', component: UserHomeView, meta: { requiresAuth: true } },
    { path: '/application', name: 'NewApplicationView', component: NewApplicationView },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession();
  if (!data.session && to.meta.requiresAuth) {
    next('/');
  } else {
    next();
  }
});

export default router;
