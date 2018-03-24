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
  flex-wrap: nowrap; 
  height: 100%;
}

.menu {
}

.panel {
  padding-left: 31px;
  padding-top: 58px;
}
</style>
