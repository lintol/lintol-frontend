<template>
  <div id="profiles-panel">
    <div v-show="showProfileRows"> 
      <button id="addNewProfileButton" class="addProfileButton" @click="addProfile">Add new Data Profile + </button>
      <h1>{{ title }}</h1>
      <p class="instructions">
        Instructions
      </p>
      <!-- tables --> 
      <div id="headings"  class="headerContainer tableSeparator">
        <label class="flexHeading">Name</label> 
        <label class="flexHeading">Creator</label> 
        <label class="flexHeading">Created</label> 
        <label class="flexHeading">Last Updated</label> 
        <label class="flexHeading">Version History</label> 
        <label class="flexHeading">Comments</label> 
        <label class="flexHeading">Unique Tag</label> 
      </div>
      <div id="noProfilesAvailable" v-if="profiles.length == 0">
        <p class="instructions"> No Profiles available for this account</p>
      </div>
      <div id="columns"  class="flexContainer">
        <profile-row :key="profile.name" v-for="profile in profiles" :profile="profile"></profile-row>
      </div>
    </div>
    <add-profile v-if="showAddProfile" v-on:addedProfile=profileAdded></add-profile>
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
    getProfiles: function () {
      axios.get(this.$apiPrefix + '/profiles/').then(response => {
        this.profiles = response.data;
        console.log(response.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    profileAdded: function () {
      this.showAddProfile = false;
      this.getProfiles();
      this.showProfileRows = true;
    },
    addProfile: function () {
      this.showProfileRows = false;
      this.showAddProfile = true;
    }
  },
  components: {
    axios: axios,
    ProfileRow: ProfileRow,
    AddProfile: AddProfile
  },
  mounted: function () {
    this.getProfiles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.headerContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.flexContainer {
  display: flex;
  flex-direction: column;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
