// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$apiPrefix', {
  get () {
    return this.$root.apiPrefix;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    apiPrefix: process.env.API_PREFIX
  }
});
