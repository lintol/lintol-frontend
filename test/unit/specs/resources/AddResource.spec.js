import Vue from 'vue';
import Vuex from 'vuex';
import AddResource from '@/components/resources/AddResource';
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
  actions: {
    [a.STORE_DATA_RESOURCE] ({ commit }, { profile, configuration }) {
    }
  }
});
describe('AddResource.vue', () => {
  const wrapper = shallowMount(AddResource, {
    store,
    localVue,
    router
  });
  it('Data is a function', () => {
    expect(AddResource.data).to.be.a('function');
  });
  it('Add resource error', async () => {
    wrapper.vm.addResource();
  });
  it('Add resource', async () => {
    let input = wrapper.find('#resourceLink');
    input.element.value = 'a';
    input.trigger('input');
    wrapper.vm.addResource();
  });
});
