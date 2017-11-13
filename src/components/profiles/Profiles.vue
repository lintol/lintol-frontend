<template>
  <div id="profiles-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">
      Instructions
    <p>
    <button class="addProfileButton">Add new Data Profile + </button>
    <!-- tables --> 
    <div id="headings"  class="flexContainer">
      <label class="flexHeading">Name</label> 
      <label class="flexHeading">Creator</label> 
      <label class="flexHeading">Created</label> 
      <label class="flexHeading">Last Updated</label> 
      <label class="flexHeading">Version History</label> 
      <label class="flexHeading">Comments</label> 
      <label class="flexHeading">Unique Tag</label> 
    </div>
    <div v-if="profiles.length == 0">
      <p class="instructions"> No Profiles available for this account</p>
    </div>
    <div id="columns"  class="flexContainer">
      <profile-row :key="profile.name" v-for="profile in profiles" :profile="profile"></profile-row> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileRow from './ProfileRow.vue';
export default {
  name: 'Profiles',
  data () {
    return {
      title: 'Data Profiles',
      profiles: [],
      accountId: 0
    };
  },
  methods: {
    getProfiles: function () {
      axios.get(this.$apiPrefix + '/dataprofiles/' + this.account).then(response => {
        this.profiles = response.data.data;
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    }
  },
  components: {
    axios: axios,
    ProfileRow: ProfileRow
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/scss/application.scss';

.flexContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.flexHeading {
  min-width: 120px;
  display: inline-block; 
}

.instructions {

}

.addProfileButton {
  color: orange;
  background-color: orange;
}
</style>
