<template>
   <div id="reportTable" v-if="reports">
    <div >
      <label class="pageTitle">{{ title }}</label>
      <p class="instructions">
        Here is a list of generated reports for this account 
      </p>
      <select id="userFilter" v-model="selectedUser" >
        <option disabled value="" >Filter by User</option> 
        <option v-for="user in userList">{{ user }}</option> 
      </select>
      <div id="noReportsAvailable" v-if="reports.length == 0">
        <p class="instructions">No Reports available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <report-row :key="report.id" v-for="report in reports" :report="report"></report-row>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_REPORTS } from '@/state/action-types';
import ReportRow from './ReportRow';

export default {
  name: 'ReportTable',
  data () {
    return {
      title: 'Reports',
      selectedUser: ''
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
      return userList;
    },
    reports: function () {
      return this.$store.getters.reports;
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
