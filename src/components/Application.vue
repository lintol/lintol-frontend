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
  methods: {
  },
  components: {
    Navigation: Navigation
  },
  watch: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.app {
  display: flex;
  flex-direction: row;
<<<<<<< HEAD
  flex-wrap: nowrap;
=======
  flex-wrap: nowrap; 
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
  height: 100%;
  height: 100vh;
}

.menu {
  height: 100%;
}

.panel {
  padding-left: 31px;
  padding-top: 58px;
<<<<<<< HEAD
  padding-right: 10px;
  overflow: auto;
=======
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
}
</style>
