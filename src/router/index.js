import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Context from '@/pages/context.vue';
import Library from '@/pages/library.vue';
import User from '@/pages/user.vue';
import Order from '@/pages/order.vue';
import Info from '@/pages/info.vue';
import ItemDetail from '@/pages/item.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/context', component: Context },
  { path: '/library', component: Library },
  { path: '/user', component: User },
  { path: '/order', component: Order },
  { path: '/info', component: Info },
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
