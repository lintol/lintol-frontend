<template>
   <div id="processorReportView processorReportView">
       <div id="reportResultDetails" class="infoBar" v-if="report">
          <div>
            <label class="issueCount">{{ report.errors }} Issues</label>
          </div>
              <div class="ragBar">
                <div>
                   <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <circle class="ragError" cx="7" cy="7" r="7"/>
                    </svg>
                    <label id="errors" style="vertical-align: top;" >{{ report.errors }}</label>
                 </div>
                 <div>
                 <svg height="14" width="14">
                    <polygon class="ragWarning" points="0,14 7,0 14,14"/>
                 </svg>
                 <label id="warnings" style="vertical-align: top;">{{ report.warnings }}</label>
                 </div>
                 <div>
                 <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <rect class="ragPass" width="14" height="14" />
                 </svg>
                 <label id="passes" style="vertical-align: top;">{{ report.passes }}</label>
               </div>
            </div>
          <div>
            <input id="searchValidations" type="text" class="searchBox" v-model="search"/>
            <select id="userFilter" class="custom-select" v-model="filteredType" >
              <option disabled value="" >Filter by Type</option>
              <option v-for="type in filterByTypeOptions">{{ type }}</option>
            </select>
            <select id="userFilter" class="custom-select" v-model="filteredProcessor" >
              <option disabled value="" >Filter by Processor</option>
              <option v-for="processor in filterByProcessorOptions">{{ processor }}</option>
            </select>
          </div>
       </div>
       <report-list-item :key="index" :reportId="reportId" :content="report.content" :reportItem="reportItem" v-for="(reportItem, index) in filteredReportItems"></report-list-item>
       <p v-if="reportItems.length === 0" >There are no items for this report</p>
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
      processorResults: [],
      search: ''
    };
  },
  components: {
    ReportListItem: ReportListItem
  },
  computed: {
    report: function () {
      var report = this.$store.state.currentReport;
      console.debug('One report', report);
      return report;
    },
    filterByProcessorOptions: function () {
      var result = [];
      this.reportItems.forEach((reportItem) => {
        if (result.indexOf(reportItem.processor) === -1) {
          result.push(reportItem.processor);
        }
      });
      console.debug('Filtered by Processor Options:', result);
      return result;
    },
    reportItems: function () {
      var reportItems = [];
      if (this.report) {
        console.debug('Report Content:', this.report.content);
        var content = JSON.parse(this.report.content);
        reportItems = [];

        if (content.tables && content.tables.length > 0) {
          content.tables.forEach(function (set) {
            if (set.errors) {
              reportItems = reportItems.concat(set.errors);
            }
            if (set.warnings) {
              reportItems = reportItems.concat(set.warnings);
            }
            if (set.informations) {
              reportItems = reportItems.concat(set.informations);
            }
          });
        }
        console.debug('Report Items:', reportItems);
      }
      return reportItems;
    },
    filterByTypeOptions: function () {
      var result = [];
      this.reportItems.forEach((reportItem) => {
        if (result.indexOf(reportItem.code) === -1) {
          result.push(reportItem.code);
        }
      });
      console.debug('Filter by Type Result:', result);
      return result;
    },
    filteredReportItems: function () {
      var result = this.reportItems;
      if (this.filteredType !== '') {
        result = result.filter((reportItem) => {
          return reportItem.code === this.filteredType;
        });
      }
      if (this.filteredProcessor !== '') {
        result = result.filter((reportItem) => {
          return reportItem.processor === this.filteredProcessor;
        });
      }
      try {
        var re = new RegExp(this.search);
        return result.filter((reportItem) => {
          return re.exec(reportItem.message);
        });
      } catch (e) {
        return this.reportItems;
      }
    }
  },
  mounted: function () {
    console.debug('Loading Report');
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
  font-size: 1em;
  color: #777776;
  vertical-align: middle;
}

.infoBar {
  margin: 30px 0px 41px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.searchBox {
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  background: url(~@/assets/images/search.svg);
  background-repeat: no-repeat;
  background-size:0.875em 0.875em;
  background-color: white;
  background-position: 95% 50%;
  border-color: #979797;
  &::placeholder {
    color: #9B9B9B;
    font-size: 0.8125em;
  }
}
</style>
