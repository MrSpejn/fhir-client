import Vue from 'vue';
import Router from 'vue-router';

import IndexView from '@/routes/IndexView';
import ShowPatientView from '@/routes/ShowPatientView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/patient/:id/',
      name: 'patient-detail',
      component: ShowPatientView,
    },
  ],
});
