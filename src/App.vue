<template>
  <div id="app" class="sideOrangeBar">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
@import 'assets/scss/application.scss';
.sideOrangeBar {
  border-left: solid 50px $sideBar;
}

body {
  margin: 0px;
}

</style>
