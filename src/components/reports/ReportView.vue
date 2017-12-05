<template>
   <div id="reportView">
    <div >
      <h1>{{ title }}</h1>
      <p class="instructions">
        Instructions
      </p>
      <div id="columns" class="flexContainer">
        <report-line :key="report.name" v-for="report in filteredReportLines" :report="report"></report-line>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ReportLine from './ReportLine';
export default {
  name: 'ReportView',
  props: {
    reportId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: 'Report',
      search: '',
      report: {} 
    };
  },
  methods: {
    getReport: function () {
      axios.get(this.$apiPrefix + '/reports/' + this.reportId).then(response => {
        this.report = response.data;
      }, response => {
        console.log('Couldnt get report.');
      });
    }
  },
  components: {
    ReportLine: ReportLine
  },
  computed: {
    filteredReportLines: function () {
      return this.report.lines.filter((event) => {
        return event.name.startsWith(this.search);
      });
    }
  },
  mounted: function () {
    this.getReport();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

</style>
