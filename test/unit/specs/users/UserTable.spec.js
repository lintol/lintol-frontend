// import Vue from 'vue';
import Vuex from 'vuex';
import UserTable from '@/components/users/UserTable';
import { shallow, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

var users = [];
var user1 = {
  name: 'mary',
  createdAt: {
    date: '2018-01-02'
  }
};
var user2 = {
  name: 'joe',
  createdAt: {
    date: '2018-01-02'
  }
};
users.push(user1);
users.push(user2);
let store = new Vuex.Store({
  state: {
    users: users
  },
  getters: {
    users: state => {
      return users;
    }
  }
});

describe('UserTable.vue', () => {
  const wrapper = shallow(UserTable, { store, localVue });
  it('Data is a function', () => {
    expect(UserTable.data).to.be.a('function');
  });
  it('Number of users', () => {
    expect(wrapper.vm.users.length).to.equal(2);
  });
  it('Filtered users', () => {
    wrapper.vm.search = 'joe';
    expect(wrapper.vm.filteredUsers.length).to.equal(1);
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
