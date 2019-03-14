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
      <input id="userSearch" class="userSearch" placeholder="Search for a User" type="Search" v-model="search">
      <div id="noUsersAvailable" v-if="users.length == 0">
        <p class="instructions">No Users available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <user-row :key="user.id" :index="index" v-for="(user, index) in filteredUsers" :user="user"></user-row>
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
      title: 'UserTable',
      group: '',
      search: ''
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
      try {
        var re = new RegExp(this.search);
        return this.users.filter((user) => {
          return re.exec(user.name);
        });
      } catch (e) {
        return this.users;
      }
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_USERS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';


.userSearch {
  width: 30%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  background: url(~@/assets/images/search.svg);
  background-repeat: no-repeat;
  background-size:0.875em 0.875em;
  background-color: white;
  background-position: 0.5125em;
  border-color: #979797;
  padding-left: 1.8625em;
  padding-top: 0.325em;
  padding-bottom: 0.325em;
  &::placeholder {
    color: #9B9B9B;
    font-size: 0.8125em;
  }
}
</style>
