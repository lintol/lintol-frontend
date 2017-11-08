<template>
  <div class="app">
   <navigation id="navigation" class="menu"></navigation>
   <router-view class="panel"/>
  </div>
</template>

<script>
import Navigation from './Navigation';
export default {
  name: 'Application',
  data () {
    return {
    };
  },
  components: {
    Navigation: Navigation
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.app {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; 
}

.menu {
  width: 15%;
}

.panel {
  width: 75%;
}
</style>
