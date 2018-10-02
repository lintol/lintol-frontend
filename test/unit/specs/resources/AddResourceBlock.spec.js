import Vue from 'vue';
import Vuex from 'vuex';
import AddResourceBlock from '@/components/resources/AddResourceBlock';
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
    loggedInUser: {
      'driver': 'ckan',
      'driverServer': true
    }
  },
  actions: {
    [a.STORE_DATA_RESOURCE] ({ commit }, { profile, configuration }) {
    }
  }
});
describe('AddResourceBlock.vue', () => {
  const wrapper = shallowMount(AddResourceBlock, {
    store,
    localVue,
    router
  });
  it('Data is a function', () => {
    expect(AddResourceBlock.data).to.be.a('function');
  });
  it('loggedInUser', () => {
    console.log(wrapper.vm.loggedInUser);
  });
  it('Upload files ckan', () => {
    wrapper.vm.uploadFiles();
  });
  it('Upload files github', () => {
    let store = new Vuex.Store({
      state: {
        loggedInUser: {
          'driver': 'github',
          'driverServer': true
        }
      },
      actions: {
        [a.STORE_DATA_RESOURCE] ({ commit }, { profile, configuration }) {
        }
      }
    });
    const wrapper = shallowMount(AddResourceBlock, {
      store,
      localVue,
      router
    });
    wrapper.vm.uploadFiles();
  });
  it('Add resource error', async () => {
    wrapper.vm.addResource();
  });
  it('Add resource', async () => {
    let input = wrapper.find('#profileDescription');
    input.element.value = 'Joe';
    input.trigger('input');
    wrapper.vm.addResource();
  });
});
