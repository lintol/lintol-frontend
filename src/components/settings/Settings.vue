<template>
  <div id="settings-panel">
    <label class="pageTitle">{{ title }}</label>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      title: 'Settings'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
</style>
