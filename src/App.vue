<template>
  <div id="app" class="sideOrangeBar">
    <div class="whiteBox"></div>
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
  border-left: solid 35px $sideBar;
  min-height: 100vh;
}

.whiteBox {
  position: fixed;
  top: 7px;
  left: 10px;
  height: 15px;
  width: 15px;	
  border: 3px solid #FFFFFF;
  box-sizing: border-box;
  min-height: 100vh;
}


body {
  margin: 0px;
}

</style>
