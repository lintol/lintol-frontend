<template>
  <div id="users-panel">
    <label class="pageTitle">{{ title }}</label>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      title: 'Users'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
</style>
