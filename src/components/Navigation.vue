<template>
  <nav>
    <ul>
      <li><router-link :to="{name: 'profiles' }">Data Profiles</router-link></li>
      <li><router-link :to="{name: 'reports' }">Reports</router-link></li>
      <li><router-link :to="{name: 'users' }">Users</router-link></li>
      <li><router-link :to="{name: 'settings' }">Settings</router-link></li>
    </ul>
  </nav>
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
<style scoped>
</style>
