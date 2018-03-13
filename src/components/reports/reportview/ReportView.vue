<template>
   <div id='reportView'>
    <router-link id="reports" :to="{name: 'reportTable' }" class="navigateToReports"> &#x3008; Back to Reports</router-link>
    <div class="reportRow" v-if="report">
        <div class="reportMainColumn">
          <label class="pageTitle">{{ report.name }}</label>
          <p class='instructions'>
           This report was create from Data Resource: <u>{{ content.tables[0].source}}</u>
          </p>
        </div>
        <div class="reportColumn">
          <label class="ranOn columnHeader">Ran On</label>
          <label v-if="report.createdAt">{{ convertDate(report.createdAt.date) }}</label>
        </div>
        <div class="reportColumn">
          <user :user="report.user"></user>
        </div>
        <div class="reportColumn">
          <label class="qualityScore" >{{ report.qualityScore }}</label>
          <label>Quality Score</label>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
import userComponent from '@/components/users/UserComponent.vue';

export default {
  name: 'ReportView',
  data () {
    return {};
  },
  components: {
    user: userComponent
  },
  methods: {
    convertDate: convertDate
  },
  computed: {
    report: function () {
      var report = this.$store.state.currentReport;
      return report;
    },
    content: function () {
      var content;
      if (this.report) {
        content = JSON.parse(this.report.content);
      } else {
        content = null;
      }
      return content;
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/reports.scss';

.reportRow {
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   justify-content: space-between;
   min-height: 80px;
   padding: 0px 10px;
   border-bottom: 1px solid $separatorColour;
 }

.ranOn {
  font-weight: bold;
  font-size: 10px;
  + label {
    font-size: 11px;
  }
}

.reportColumn {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  flex: 1;
}

.reportMainColumn {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  flex: 2;
}

.user {
  font-size: 12px;
}

.alignImage {
  vertical-align: middle;
  padding-right: 10px;
}

  
</style>
