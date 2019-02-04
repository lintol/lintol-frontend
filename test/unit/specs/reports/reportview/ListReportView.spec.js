import Vue from 'vue';
import Vuex from 'vuex';
import ListReportView from '@/components/reports/reportview/ListReportView';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as a from '@/state/action-types';
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VeeValidate, { errorBagName: 'vErrors', fieldsBagName: 'vFields' });

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter(
  {
    routes: [
    // dynamic segments start with a colon
      {
        path: '/something',
        children: [
          {
            name: 'profiles',
            path: 'profiles',
            children: [
              { name: 'profileTable', path: 'profiletable' },
              { name: 'addProfile', path: 'addprofile' },
              { name: 'editProfile', path: 'editprofile/:profileId', props: true }
            ]
          }
        ]
      }
    ]
  }
);
let store = new Vuex.Store({
  state: {
    currentReport: {
      'content': '{"tables": [{"errors": 1, "warnings" : 1, "informations" : 1}],"poppopo": "sadasdsad"}'
    }
  },
  actions: {
    [a.STORE_DATA_RESOURCE] ({ commit }, { profile, configuration }) {
    }
  }
});
describe('ListReportView.vue', () => {
  const wrapper = shallowMount(ListReportView, {
    store,
    localVue,
    router
  });
  it('Data is a function', () => {
    expect(ListReportView.data).to.be.a('function');
  });
  it('filteredReportItems', () => {
    expect(ListReportView.data).to.be.a('function');
  });

});
