<template>
   <div id="processorReportView processorReportView">
       <div id="reportResultDetails" class="infoBar">
          <div>
            <label class="issueCount">58 Issues</label>
          </div>
              <div class="ragBar">
                <div>
                   <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <circle class="ragError" cx="7" cy="7" r="7"/>
                    </svg>
                    <label id="errors" style="vertical-align: top;" >{{ report.attributes.errors }}</label>
                 </div>
                 <div>
                 <svg height="14" width="14">
                    <polygon class="ragWarning" points="0,14 7,0 14,14"/>
                 </svg>
                 <label id="warnings" style="vertical-align: top;">{{ report.attributes.warnings }}</label>
                 </div>
                 <div>
                 <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <rect class="ragPass" width="14" height="14" />
                 </svg>
                 <label id="passes" style="vertical-align: top;">{{ report.attributes.passes }}</label>
               </div>
            </div>
          <div>
            <input id="searchValidations" type="text" class="searchBox" />
            <select id="userFilter" v-model="filteredType" >
              <option disabled value="" >Filter by Type</option>
              <option v-for="type in filterByTypeOptions">{{ type }}</option>
            </select>
            <select id="userFilter" v-model="filteredProcessor" >
              <option disabled value="" >Filter by Processor</option>
              <option v-for="processor in filterByiProcessorOptions">{{ processor }}</option>
            </select>
          </div>
       </div>
       <report-list-item :reportId="reportId" :content="report.attributes.content" :reportItem="reportItem" v-for="reportItem in reportItems"></report-list-item>
       <p v-if="reportItems.length === 0" >There is no items for this report</p>
  </div>
</template>

<script>
import { LOAD_REPORT } from '@/state/action-types';
import ReportListItem from './ReportListItem';
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
      filteredType: '',
      filteredProcessor: '',
      processorResults: []
    };
  },
  components: {
    ReportListItem: ReportListItem
  },
  computed: {
    filterByTypeOptions: function () {
      return [];
    },
    filterByiProcessorOptions: function () {
      return [];
    },
    report: function () {
      var report = this.$store.state.currentReport;
      return report;
    },
    reportItems: function () {
      /* var content = JSON.parse(this.report.attributes.content);
      console.log(content.tables.errors);
      return content.tables[0].errors; */
      var content = JSON.parse(this.$store.state.currentReport.attributes.content);
      var reportItems = content.tables[0].errors;
      console.log('Report');
      console.log(reportItems);
      return reportItems;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_REPORT, this.reportId);
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/reports.scss';

.ragBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0.5;
}

.issueCount {
  font-size: 24px;
  color: #777776;
  vertical-align: middle;
}

.infoBar {
  margin: 30px 0px 41px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
