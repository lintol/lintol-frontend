<template>
  <div id="profileTable">
    <transition name="component-fade" mode="in-out">
    <div>
      <button id="addNewProfileButton" class="addButton" @click="addProfile">Add new Data Profile <label>&#10133;</label></button>
      <label class="pageTitle">{{ title }}</label>
      <p class="instructions">
        A List of Data Profiles associated with this account. You can add more data profiles by clicking the "Add New Data Profile" button.
      </p>
      <select id="dateFilter" v-model="selectedDate" >
        <option disabled value="" >Filter by Date</option> 
        <option v-for="date in dateList">{{ date }}</option> 
      </select>
      <select>
        <option value="">Filter By Sites</option>
      </select>
      <div id="noProfilesAvailable" v-if="profiles.length == 0">
        <p class="instructions"> No Profiles available for this account</p>
      </div>
      <div id="columns"  class="flexContainer">
        <profile-row :key="profile.id" v-for="profile in profiles" :profile="profile"></profile-row>
      </div>

    </div>
    </transition>
  </div>
</template>

<script>
import ProfileRow from './ProfileRow.vue';
import AddProfile from './AddProfile.vue';
import { LOAD_PROFILES } from '@/state/action-types';
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'Profiles',
  data () {
    return {
      title: 'Data Profiles',
      accountId: 0,
      selectedDate: ''
    };
  },
  methods: {
    addProfile: function () {
      this.$router.push({name: 'addProfile'});
    }
  },
  computed: {
    profiles: function () {
      return this.$store.getters.profiles;
    },
    userList: function () {
      var userList = [];
      this.reports.filter((event) => {
        if (userList.indexOf(event.user) === -1) {
          userList.push(event.user);
        }
      });
      return userList;
    },
    dateList: function () {
      var dateList = [];
      this.profiles.filter((event) => {
        console.log(event);
        if (dateList.indexOf(convertDate(event.created_at)) === -1) {
          dateList.push(convertDate(event.created_at));
        }
      });
      return dateList;
    }
  },
  components: {
    ProfileRow: ProfileRow,
    AddProfile: AddProfile
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROFILES);
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

</style>
