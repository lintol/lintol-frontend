<template>
   <div id="reportTable" v-if="reports">
    <div >
      <label class="pageTitle">{{ title }}</label>
      <p class="instructions">
        Here is a list of generated reports for this account 
      </p>
      <select id="dateFilter" v-model="selectedDate" >
        <option disabled value="" >Filter by Date</option> 
        <option v-for="date in dateList">{{ date }}</option> 
      </select>
      <select id="userFilter" v-model="selectedUser" >
        <option disabled value="" >Filter by User</option> 
        <option v-for="user in userList">{{ user }}</option> 
      </select>
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
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'ReportTable',
  data () {
    return {
      title: 'Reports',
      selectedUser: '',
      selectedDate: ''
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
      if (this.selectedUser !== '') {
        result = result.filter((report) => {
          return report.user === this.selectedUser;
        });
      }
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

</style>
