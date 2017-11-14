<template>
  <div>
    <div>
     <img class="logo center" src="../assets/logo.png" />
     </div>
  <nav>
    <ul>
      <li><router-link id="profiles" class="active" :to="{name: 'profiles' }">Data Profiles</router-link></li>
      <li><router-link id="reports"  :to="{name: 'reports' }">Reports</router-link></li>
      <li><router-link id="users"  :to="{name: 'users' }">Users</router-link></li>
      <li><router-link id="settings" :to="{name: 'settings' }">Settings</router-link></li>
    </ul>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/application.scss';

.active {
  color: red;
}

.logo {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
