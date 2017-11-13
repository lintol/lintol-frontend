<template>
  <div id="profiles-panel">
     
    <h1>{{ title }}</h1>
    <p class="instructions">
      Instructions
    <p>
    <button class="addProfileButton">Add new Data Profile + </button>
    <!-- tables --> 
    <div id="headings"  class="flexContainer tableSeparator">
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
    <add-profile></add-profile>
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
    ProfileRow: ProfileRow,
    AddProfile: AddProfile
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  background-color: $buttonColour; 
  border: none;
  border-radius: 5px;
  color: $buttonText;
  padding: 15px 32px;
  box-shadow: 0px 0px 5px black;
  display: inline-block;
  float: right;
  &:active {
    box-shadow: 0px 0px 0px black;
  }
  &:focus {
    outline:0;
    border: none;
  }
} 

.tableSeparator {
  border-bottom: 2px solid black;
  padding-bottom: 15px;
} 


</style>
