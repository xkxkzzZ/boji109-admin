import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from "@/store/superuser";
import { isTokenExpired } from "@/utils/token";

import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Context from '@/pages/context.vue';
import Library from '@/pages/library.vue';
import User from '@/pages/user.vue';
import Info from '@/pages/info.vue';
import ItemDetail from '@/pages/item.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/context', component: Context  ,meta: { requiresAuth: true }},
  { path: '/library', component: Library ,meta: { requiresAuth: true }},
  { path: '/user', component: User ,meta: { requiresAuth: true }},
  { path: '/info', component: Info ,meta: { requiresAuth: true }},
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 如果目标页面需要登录才访问（自己设的标志）
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    const token = authStore.token;

    if (!token || isTokenExpired(token)) {
      authStore.logout();
      alert("登录状态已过期，请重新登录");
      // return next({
      //   path: "/login",
      //   query: { redirect: to.fullPath }, // 可选：重定向回来源页
      // });
      // 不跳转页面，只留在当前页面（或放行但无效）
      return next(false); // 阻止导航
    }
  }

  next();
});

export default router;
