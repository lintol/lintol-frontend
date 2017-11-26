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
      <div id="noReportsAvailable" v-if="filteredReports.length == 0">
        <p class="instructions"> No Reports available for this account</p>
      </div>
      <div id="columns" v-else class="flexContainer">
        <report-row :key="report.name" v-for="report in filteredReports" :report="report"></report-row>
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
