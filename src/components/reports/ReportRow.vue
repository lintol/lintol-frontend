<template>
  <div id="reports-row" class="shadedRow">
    <div class="reportRow">
      <div class="reportMainColumn center">
        <div class="rightSeparator">
          <label class="profileName columnHeader">Report {{ report.profile }}</label>
          <p class="reportName">{{ report.name }}</p>
        </div>
      </div>
      <div class="reportColumn center">
        <label class="ranOn columnHeader">Ran On</label>
        <label v-if="report.createdAt">{{ convertDate(report.createdAt.date) }}</label>
      </div>
      <div class="reportColumn center">
        <user id="creator" :user="report.user"></user>
      </div>
      <div class="reportColumn ragDisplay">
        <div>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
           <circle class="ragError" cx="7" cy="7" r="7"/>
        </svg>
        <label id="errors" class="ragNumber" >{{ report.errors }}</label>
        </div>
        <div>
         <svg height="14" width="14">
           <polygon class="ragWarning" points="0,14 7,0 14,14"/>
         </svg> 
        <label id="warnings" class="ragNumber">{{ report.warnings }}</label>
        </div>
        <div>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
          <rect class="ragPass" width="14" height="14" fill="lime"/>
        </svg>
        <label id="passes" class="ragNumber">{{ report.passes }}</label>
        </div>
      </div>
      <div class="reportColumn center">
        <label class="qualityScore" >{{ report.qualityScore }}</label>
        <label>Quality Score</label>
      </div>
      <div class="reportColumn center">
        <div>
        <input id="viewReport + 'report.name'" type="button" value="View Report" @click="viewReport(report.id)" class="viewButton"/> 
        <!--<router-link id="viewReport + 'report.name'" type="button" :to="{name: 'listReportView' }" class="viewButton">View Report</router-link>-->
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
import userComponent from '@/components/users/UserComponent.vue';

export default {
  name: 'ReportRow',
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {
    viewReport: function (id) {
      this.$router.push({name: 'listReportView', params: {'report': this.report, 'reportId': id}});
    },
    convertDate: convertDate
  },
  components: {
    user: userComponent
  },
  computed: {
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';
@import '../../assets/scss/reports.scss';

label {
  margin-bottom: 0px;
}

.reportColumn {
  flex: 1;
} 

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reportMainColumn {
  flex: 2;
  padding: 10px;
}

.reportAction {
  min-width: 120px;
  display: inline-block;
}
.reportRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  max-height: 70px;
  padding: 0px 10px;
}
 
.columnTitle {
  font-weight: bold;
}

.verticalAlign {
  vertical-align: middle;
}

div .reportColumn p {
  margin: unset;
  color: grey;
}

.reportPicture {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.ragDisplay{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center; 
}

.columnHeader {
  font-weight: bold;
}

.ranOn {
  font-weight: bold;
  font-size: 10px;
  margin-left: 20px;
  + label {
    font-size: 11px;
    margin-left: 20px;
  }
}

.ragNumber {
  vertical-align: top;
  font-size: 12px;
}

.profileName {
  font-size: 10px;
}

.reportName {
  font-size: 10px;
}

.user {
  font-size: 12px;
}

</style>
