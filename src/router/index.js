import Vue from 'vue';
import Router from 'vue-router';
import Application from '@/components/Application';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Application',
      component: Application
    }
  ]
});
