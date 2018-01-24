<template>
  <div id="resourceTable">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">
      The list of resources that have been validated by Lintol</p>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ResourceTable',
  data () {
    return {
      title: 'Resources',
      resources: []
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
</style>
