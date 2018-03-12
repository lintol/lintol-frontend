<template>
  <div id="users-panel">
   <label class="pageTitle">{{ title }}</label>

   <div id="userTable" v-if="users">
    <div>
      <p class="instructions">
        List of accessible users
      </p>
      <!--<select id="groupFilter" v-model="group">
        <option disabled value="" >Filter by Groups</option> 
      </select>-->
      <div id="noUsersAvailable" v-if="users.length == 0">
        <p class="instructions">No Users available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <user-row :key="user.id" v-for="user in filteredUsers" :user="user"></user-row>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { LOAD_USERS } from '@/state/action-types';
import UserRow from './UserRow';

export default {
  name: 'Users',
  data () {
    return {
      title: 'Users',
      group: ''
    };
  },
  components: {
    UserRow: UserRow
  },
  computed: {
    users: function () {
      return this.$store.getters.users;
    },
    filteredUsers: function () {
      var result = this.users;
      return result;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_USERS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
</style>
