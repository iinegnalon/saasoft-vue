import { createRouter, createWebHistory } from 'vue-router';
import AccountsView from '../views/AccountsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SaaSoft',
      component: AccountsView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || 'SaaSoft';
  next();
});

export default router;
