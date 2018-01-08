<template>
   <div id='reportView'>
    <div >
      <h1>{{ title }}</h1>
      <p class='instructions'>
        Instructions
      </p>
      <!--<div id='columns' class='flexContainer'>
        <report-line :key='report.name' v-for='report in filteredReportLines' :report='report'></report-line>
      </div>-->
      <div id='report' />
    </div>
  </div>
</template>

<script>
import ReportLine from './ReportLine';
import goodtablesUI from 'goodtables-ui';
import { LOAD_REPORT } from '@/state/action-types';

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
      search: ''
    };
  },
  components: {
    ReportLine: ReportLine
  },
  computed: {
    report: function () {
      return this.$store.state.currentReport;
    },
    filteredReportLines: function () {
      try {
        var re = new RegExp(this.search);
        return this.report.attributes.content.filter((line) => {
          return re.exec(line);
        });
      } catch (e) {
        return this.report.attributes.content;
      }
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_REPORT, this.reportId);
  },
  watch: {
    report: function () {
      const element = document.getElementById('report');
      var content = JSON.parse(this.report.attributes.content[0])[0]['goodtables:all'][2];
      console.log(content);
      goodtablesUI.render(goodtablesUI.Report, {report: content}, element);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../assets/scss/application.scss';

</style>
