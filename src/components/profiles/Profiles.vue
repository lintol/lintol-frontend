<template>
  <div id="profiles-panel">
     <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileRow from './ProfileRow.vue';
import AddProfile from './AddProfile.vue';
export default {
  name: 'Profiles',
  data () {
    return {
      title: 'Data Profiles',
      profiles: [],
      accountId: 0,
      showProfileRows: true,
      showAddProfile: false
    };
  },
  methods: {
  },
  components: {
    axios: axios,
    ProfileRow: ProfileRow,
    AddProfile: AddProfile
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
