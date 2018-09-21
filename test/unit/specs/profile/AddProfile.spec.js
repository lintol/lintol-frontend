import Vue from 'vue';
import Vuex from 'vuex';
import AddProfile from '@/components/profiles/AddProfile';
import * as a from '@/state/action-types';
import { shallow, createLocalVue } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { errorBagName: 'vErrors', fieldsBagName: 'vFields' });

const localVue = createLocalVue();
localVue.use(Vuex);

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
    [a.STORE_PROFILE] ({ commit }) {
    },
    [a.LOAD_PROCESSORS] ({ commit }) {
    }
  }
});

describe('AddProfile.vue', () => {
  const wrapper = shallow(AddProfile, {
    propsData: {
      profileId: '1'
    },
    store,
    localVue
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
  it('Add Profile', () => {
    wrapper.vm.addProfile();
    // expect(wrapper.vm.);
  });
});
