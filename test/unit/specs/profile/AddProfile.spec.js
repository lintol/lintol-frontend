import Vue from 'vue';
import Vuex from 'vuex';
import AddProfile from '@/components/profiles/AddProfile';
import * as a from '@/state/action-types';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';

Vue.use(VeeValidate, { errorBagName: 'vErrors', fieldsBagName: 'vFields' });
const localVue = createLocalVue();
localVue.use(Vuex);
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

var currentProfile = {
  name: 'unit test profile',
  description: 'interesting description',
  creator: 'Mary',
  version: 7,
  uniqueTag: 'uniq-66-'
};

var processors = [];
var processor1 = {
  id: 1,
  name: 'csv'
};
var processor2 = {
  id: 2,
  name: 'json'
};
processors.push(processor1);
processors.push(processor2);

let store = new Vuex.Store({
  state: {
    currentProfile: currentProfile
  },
  getters: {
    processors: state => {
      return processors;
    }
  },
  actions: {
    [a.STORE_PROFILE] ({ commit }, { profile, configuration }) {
    },
    [a.LOAD_PROCESSORS] ({ commit }) {
    }
  }
});

describe('AddProfile.vue', () => {
  const wrapper = shallowMount(AddProfile, {
    propsData: {
      profileId: '1'
    },
    store,
    localVue,
    router
  });
  it('Data is a function', () => {
    expect(AddProfile.data).to.be.a('function');
    expect(AddProfile.data()).has.property('title');
  });
  it('Title is set', () => {
    expect(AddProfile.data).to.be.a('function');
    expect(wrapper.vm.$el.querySelector('#add-profile-panel label').textContent).to.equal('Add Data Profile');
  });
  it('Processors selected ', () => {
    var option = {
      label: 'json processor',
      value: 1
    };
    wrapper.vm.processorSelected(option);
    expect(wrapper.vm.chosenProcessors.length).to.equal(1);
  });
  it('Remove selected Processor', () => {
    wrapper.vm.removeSelectedProcessor('csv');
    expect(wrapper.vm.chosenProcessors.length).to.equal(0);
  });
  it('Number of Processors to choose', () => {
    expect(wrapper.vm.processorList.length).to.equal(2);
  });
  it('Add Profile error', async () => {
    wrapper.vm.profile = {
      name: 'Joe',
      description: 'Some description',
      creator: 'Martin',
      version: 7,
      uniqueTag: 'uniq-66-Joe' + name
    };
    wrapper.vm.addProfile();
    // expect(wrapper.vm.);
  });
  it('Add Profile', async () => {
    wrapper.vm.profile = {
      name: 'Joe',
      description: 'Some description',
      creator: 'Martin',
      version: 7,
      uniqueTag: 'uniq-66-Joe' + name
    };
    let input = wrapper.find('#profileName');
    input.element.value = 'Joe';
    input.trigger('input');
    let input2 = wrapper.find('#profileDescription');
    input2.element.value = 'Some po';
    wrapper.vm.addProfile();
    // expect(wrapper.vm.);
  });
});
