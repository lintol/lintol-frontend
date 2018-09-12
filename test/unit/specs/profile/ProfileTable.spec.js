// import Vue from 'vue';
import Vuex from 'vuex';
import ProfileTable from '@/components/profiles/ProfileTable';
import { shallow, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

var profiles = [];
var profile1 = {
  name: 'CSV profile',
  description: 'CSV',
  created_at: {
    date: '2001-01-02 00:00:00'
  },
  updated_at: {
    date: '2001-01-02 00:00:00'
  }
};
var profile2 = {
  name: 'JSON profile',
  description: 'JSON',
  created_at: {
    date: '2001-01-01 00:00:00'
  },
  updated_at: {
    date: '2001-01-01 00:00:00'
  }
};
profiles.push(profile1);
profiles.push(profile2);
let store = new Vuex.Store({
  state: {
    profiles: profiles
  },
  getters: {
    profiles: state => {
      return profiles;
    }
  }
});

describe('ProfileTable.vue', () => {
  const wrapper = shallow(ProfileTable, { store, localVue });
  it('Data is a function', () => {
    expect(ProfileTable.data).to.be.a('function');
  });
  it('Get all profiles ', () => {
    expect(wrapper.vm.profiles.length).to.equal(2);
  });
  it('Get profiles by name', () => {
    wrapper.vm.selectedName = 'JSON profile';
    expect(wrapper.vm.filteredProfiles.length).to.equal(1);
  });
});
