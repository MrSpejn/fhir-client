import Vue from 'vue';
import Router from 'vue-router';

import IndexView from '@/routes/IndexView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'index',
        component: IndexView,
      },
  ],
});
