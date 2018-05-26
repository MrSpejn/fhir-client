import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

import 'vuetify/dist/vuetify.min.css';


import router from '@/routes/router';
import store from '@/vuex/store';
import App from './App';
import { configureRequests } from './request';


import './assets/styles/main.scss';

Vue.config.productionTip = false;

/* eslint-disable no-new */

window.store = store;

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


configureRequests(store).then(() => {
  Vue.use(Vuetify, {
    theme: {
      primary: '#0097CD',
      secondary: '#01CC7F',
      error: '#cc2222',
    },
  });
  Vue.use(Vuelidate);
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  });
});

/* eslint-enable no-new */
