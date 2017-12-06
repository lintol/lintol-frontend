<template>
   <div id="reportTable">
    <div >
      <h1>{{ title }}</h1>
      <p class="instructions">
        Here is a list of generate reports for this account 
      </p>
      <select id="userFilter" v-model="selectedUser" >
        <option disabled value="" >Filter by User</option> 
        <option v-for="user in userList">{{ user }}</option> 
      </select>
      <div id="noReportsAvailable" v-if="reports.length == 0">
        <p class="instructions">No Reports available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <report-row :key="report.name" v-for="report in reports" :report="report"></report-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ReportRow from './ReportRow';
export default {
  name: 'ReportTable',
  props: {
  },
  data () {
    return {
      title: 'Reports',
      reports: [],
      userList: [],
      selectedUser: ''
    };
  },
  methods: {
    getReports: function () {
      axios.get(this.$apiPrefix + '/reports/').then(response => {
        this.reports = response.data;
        this.populateUserList();
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    populateUserList: function () {
      this.reports.filter((event) => {
        if (this.userList.indexOf(event.user) === -1) {
          this.userList.push(event.user);
        }
      });
    }
  },
  components: {
    ReportRow: ReportRow
  },
  computed: {
    filteredUsers: function () {
      return this.reports.filter((event) => {
        return event.user.startsWith(this.user);
      });
    }
  },
  mounted: function () {
    this.getReports();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

</style>
