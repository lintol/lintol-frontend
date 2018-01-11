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
    $route: function () {
      console.log(this.$route.params);
    }
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
  padding: 30px;
  height: 1200px;
}

.menu {
  width: 15%;
  height: 100%;
}

.panel {
  width: 75%;
  padding: 50px 20px;
}
</style>
