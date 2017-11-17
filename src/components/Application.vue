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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.app {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; 
  height: 800px;
}

.menu {
  width: 15%;
}

.panel {
  width: 75%;
}
</style>
