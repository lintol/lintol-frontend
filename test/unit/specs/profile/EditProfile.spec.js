import Vue from 'vue';
import Vuex from 'vuex';
import EditProfile from '@/components/profiles/EditProfile';
import * as a from '@/state/action-types';
import { shallow, createLocalVue } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { errorBagName: 'vErrors', fieldsBagName: 'vFields' });

const localVue = createLocalVue();
localVue.use(Vuex);

var currentProfile = {
  name: 'unit test profile',
  description: 'interesting description',
  creator: 'Martin',
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
    [a.LOAD_PROFILE] ({ commit }) {
    }
    /* [a.LOAD_PROCESSORS] ({ commit }) {
    } */
  }
});

describe('EditProfile.vue', () => {
  const wrapper = shallow(EditProfile, {
    propsData: {
      profileId: '1'
    },
    store,
    localVue
  });
  it('Data is a function', () => {
    expect(EditProfile.data).to.be.a('function');
    expect(EditProfile.data()).has.property('title');
  });
  it('Title is set', () => {
    expect(EditProfile.data).to.be.a('function');
    expect(wrapper.vm.$el.querySelector('#edit-profile-panel label').textContent).to.equal('Edit Profile');
  });
  it('Processors selected ', () => {
    var processorId = 1;
    wrapper.vm.processorSelected({value: processorId});
    expect(wrapper.vm.configurations.length).to.equal(1);
  });
  it('Processors removed ', () => {
    wrapper.vm.removeSelectedProcessor('csv');
    expect(wrapper.vm.configurations.length).to.equal(0);
  });
  it('Processors saved ', () => {
    wrapper.vm.saveProfile();
  });
});
