<template>
   <div id="reportTable" v-if="reports">
    <div >
      <label class="pageTitle">{{ title }}</label>
      <p class="instructions">
        Here is a list of generated reports for this account 
      </p>
      <div class="btn-group filters">
        <select class="custom-select" id="dateFilter" v-model="selectedDate" >
          <option disabled value="" >Filter by Date</option> 
          <option v-for="date in dateList">{{ date }}</option> 
        </select>
        <select class="custom-select" id="userFilter" v-model="selectedUser" >
          <option disabled value="" >Filter by User</option> 
          <option v-for="user in userList">{{ user.name }}</option> 
        </select>
        <select class="custom-select" id="profileFilter" v-model="selectedProfile" >
          <option disabled value="" >Filter by Profile</option> 
          <option v-for="profile in profileList">{{ profile }}</option> 
        </select>
      </div>
      <div id="noReportsAvailable" v-if="reports.length == 0">
        <p class="instructions">No Reports available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <report-row :key="report.id" v-for="report in filteredReports" :report="report"></report-row>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_REPORTS } from '@/state/action-types';
import ReportRow from './ReportRow';
import { convertDate, selectedFiltered } from '@/components/common/date.js';
export default {
  name: 'ReportTable',
  data () {
    return {
      title: 'Reports',
      selectedUser: '',
      selectedDate: '',
      selectedProfile: ''
    };
  },
  methods: {
  },
  components: {
    ReportRow: ReportRow
  },
  computed: {
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
      this.reports.filter((event) => {
        if (event.createdAt && dateList.indexOf(convertDate(event.createdAt.date)) === -1) {
          dateList.push(convertDate(event.createdAt.date));
        }
      });
      return dateList;
    },
    profileList: function () {
      var profileList = [];
      this.reports.filter((event) => {
        if (profileList.indexOf(event.profile) === -1) {
          profileList.push(event.profile);
        }
      });
      return profileList;
    },
    reports: function () {
      return this.$store.getters.reports;
    },
    filteredReports: function () {
      var result = this.reports;
      if (this.selectedDate !== '') {
        result = result.filter((report) => {
          return convertDate(report.createdAt.date) === this.selectedDate;
        });
      }
      result = selectedFiltered(result, this.selectedUser, 'user');
      result = selectedFiltered(result, this.selectedProfile, 'profile');
      return result;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_REPORTS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

select {
  height: 28px;
  &.custom-select {
    margin: auto 10px 10px auto;
  }
}

.filters {
  max-width: 40%;
}

</style>
