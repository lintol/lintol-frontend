<template>
   <div id="reportTable">
    <div >
      <h1>{{ title }}</h1>
      <p class="instructions">
        Instructions
      </p>
      <label for="reportSearch">Filter:</label>
      <input id="reportSearch" type="text" v-model="search">
      <!-- tables -->
      <div id="headings"  class="headerContainer tableSeparator">
        <label class="flexHeading">Name</label> 
        <label class="flexHeading">Description</label> 
        <label class="flexHeading">Created</label> 
        <label class="flexHeading">Last Updated</label> 
        <label class="flexHeading">Unique Tag</label> 
      </div>
      <div id="noReportsAvailable" v-if="filteredReports.length == 0">
        <p class="instructions"> No Reports available for this account</p>
      </div>
      <div id="columns"  v-else class="flexContainer">
        <report-row :key="processor.name" v-for="processor in filteredReports" :processor="processor"></processor-row>
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
      search: '',
      reports: []
    };
  },
  methods: {
    getReports: function () {
      axios.get(this.$apiPrefix + '/reports/').then(response => {
        this.reports = response.data;
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    addReport: function () {
      this.$router.push({name: 'addReport'});
    }
  },
  components: {
    ReportRow: ReportRow
  },
  computed: {
    filteredReports: function () {
      return this.reports.filter((event) => {
        return event.name.startsWith(this.search);
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
