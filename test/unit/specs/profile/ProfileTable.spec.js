// import Vue from 'vue';
import Vuex from 'vuex';
import ProfileTable from '@/components/profiles/ProfileTable';
import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({
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
});

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
  const wrapper = shallow(ProfileTable, { store, localVue, router });
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
  it('Add profile', () => {
    wrapper.vm.addProfile();
  });
});
describe('ProfileTable.vue', () => {
  const wrapper = shallow(ProfileTable, { store, localVue, router });
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
  it('Add profile', () => {
    wrapper.vm.addProfile();
  });
});
