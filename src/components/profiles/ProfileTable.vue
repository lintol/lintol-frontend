<template>
  <div id="profileTable">
    <transition name="component-fade" mode="in-out">
    <div > 
      <button id="addNewProfileButton" class="addProfileButton" @click="addProfile">Add new Data Profile + </button>
      <h1>{{ title }}</h1>
      <p class="instructions">
        Instructions
      </p>
      <select class="rowFilter">
        <option value="">Filter By Groups</option>
      </select>
      <select class="rowFilter">
        <option value="">Filter By Sites</option>
      </select>
      <!-- tables --> 
      <!--<div id="headings"  class="headerContainer tableSeparator">
        <label class="flexHeading">Name</label> 
        <label class="flexHeading">Description</label> 
        <label class="flexHeading">Creator</label> 
        <label class="flexHeading">Created</label> 
        <label class="flexHeading">Last Updated</label> 
        <label class="flexHeading">Version History</label> 
        <label class="flexHeading">Unique Tag</label> 
      </div>-->
      <div id="noProfilesAvailable" v-if="profiles.length == 0">
        <p class="instructions"> No Profiles available for this account</p>
      </div>
      <div id="columns"  class="flexContainer">
        <profile-row :key="profile.name" v-for="profile in profiles" :profile="profile"></profile-row>
      </div>
    </div>
    </transition>
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
      axios.get(this.$apiPrefix + '/profiles/').then(response => {
        this.profiles = response.data;
        console.log(response.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    addProfile: function () {
      this.$router.push({name: 'addProfile'});
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

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.shadedBox {
  border: 1px solid black;
  border-radius: 3px;
  background-color: pink;
}
</style>
