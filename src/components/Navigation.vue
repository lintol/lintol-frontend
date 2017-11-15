<template>
  <div>
     <router-link id="home" :to="{name: 'Application' }">
       <img class="logo center" src="../assets/logo.png" title="Home">
     </router-link>
  <nav>
    <ul>
      <li id="profilesLink" :class="{ active: currentView == 'profiles'}" ><router-link id="profiles" :to="{name: 'profileTable' }">Data Profiles</router-link></li>
      <li id="reportsLink" :class="{ active: currentView == 'reports'}"><router-link id="reports"  :to="{name: 'reports' }">Reports</router-link></li>
      <li id="usersLink" :class="{ active: currentView == 'users'}"><router-link id="users"  :to="{name: 'users' }">Users</router-link></li>
      <li id="settingsLink" :class="{ active: currentView == 'settings'}"><router-link id="settings" :to="{name: 'settings' }">Settings</router-link></li>
    </ul>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      currentView: 'profiles'
    };
  },
  watch: {
    $route: function () {
      console.log('New route:' + this.$route.name);
      this.currentView = this.$route.name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/application.scss';

.active {
  color: red;
  background-color: #EDEDED;
}

.logo {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

</style>
