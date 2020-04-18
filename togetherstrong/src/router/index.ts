import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { completeAuthWithEmailLink } from '@/utils/FirebaseAuth';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
  {
    path: '/get-help',
    name: 'GetHelp',
    // route level code-splitting
    // this generates a separate chunk (get-help.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'get-help' */ '../views/GetHelp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    'loginlink' in to.query &&
    to.query['loginlink'].toString().toLocaleLowerCase() == 'true'
  ) {
    completeAuthWithEmailLink();
  }
  next();
});

export default router;
