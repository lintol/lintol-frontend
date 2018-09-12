<template>
  <div id="profiles-panel">
     <router-view></router-view>
  </div>
</template>

<script>
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
  components: {
    ProfileRow: ProfileRow,
    AddProfile: AddProfile
  }
};
</script>

<style lang="scss" scoped>
</style>
