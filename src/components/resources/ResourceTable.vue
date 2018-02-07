<template>
  <div id="resourceTable" v-if="resources">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">
      The list of resources that have been validated by Lintol</p>
    </p>
    <div id="columns" class="flexContainer" v-if="resources">
      <div :key="resource.id" v-for="resource in resources">
        <h2>{{ resource.name }}</h2>
        <p>
          <a v-if="resource.url" :href="resource.url">{{ resource.filename }}</a>
          <span v-else>{{ resource.filename }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_DATA_RESOURCES } from '@/state/action-types';

export default {
  name: 'ResourceTable',
  data () {
    return {
      'title': 'Data Resources'
    };
  },
  computed: {
    resources: function () {
      return this.$store.getters.dataResources;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_DATA_RESOURCES);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
</style>
