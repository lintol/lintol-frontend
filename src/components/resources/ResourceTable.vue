<template>
  <div id="resourceTable">
    <h1>{{ msg }}</h1>
    <p>The list of resources that have been validated by Lintol</p>
  </div>
</template>

<script>
export default {
  name: 'ResourceTable',
  data () {
    return {
      msg: 'Resources',
      resources: []
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
