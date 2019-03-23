// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';
import store from './state/store';
import Vue2Leaflet from 'vue2-leaflet';
import lodash from 'lodash';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Paginate from 'vuejs-paginate';
import vSelect from 'vue-select';

/* Work around to get Vue2Leaflet markers working */
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/**************************************/

Vue.config.productionTip = false;
Vue.use(VeeValidate, { errorBagName: 'vErrors', fieldsBagName: 'vFields' });
Vue.use(VueFormGenerator);
Vue.use(BootstrapVue);

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-polygon', Vue2Leaflet.Polygon);
Vue.component('v-geojson-layer', Vue2Leaflet.GeoJSON);

Vue.component('paginate', Paginate);
Vue.component('v-select', vSelect);

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

var bus = new Vue({});
Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  data: {
    bus: bus
  }
});
