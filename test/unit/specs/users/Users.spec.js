import Vue from 'vue';
import Vuex from 'vuex';
import UserTable from '@/components/users/UserTable';
import { mount } from '@vue/test-utils';

var users = [];
var user1 = { name: 'martin' };
var user2 = { name: 'mary' };
users.push(user1);
users.push(user2);
Vue.use(Vuex);

describe('UserTable.vue', () => {
  describe('Test filtered Users', () => {
    const wrapper = mount(UserTable);
    it('No filtered users should be present ', () => {
      expect(wrapper.vm.filteredUsers.length).to.equal(0);
    });
    it('No users should be present ', () => {
      expect(wrapper.vm.users.length).to.equal(0);
    });
  });
});
