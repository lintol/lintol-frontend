<template>
  <div style=''>
    <b-row no-gutters class="shadedRow" style='padding:10px'>
      <b-col sm='3' cols='10' class="center first rightSeparator" style='padding: 10px 5px;' v-on:click='openTab'>
          <label class="profileName columnHeader">Report {{ report.profile }}</label>
          <p class="reportName">{{ report.name }}</p>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols = '12' order='3' class='third bottom-bar show'>

      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols='6' sm='2' class="reportColumn center third fullSize">
        <label class="ranOn columnHeader">Ran On</label>
        <label v-if="report.createdAt">{{ convertDateTime(report.createdAt.date) }}</label>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols='6' sm='2' class="reportColumn center third fullSize">
        <user id="creator" :user="report.user"></user>
      </b-col>
      <b-col sm='3' cols='2' class='center second' v-on:click='openTab'>
        <b-row class="reportColumn ragDisplay">
          <b-col cols='12' sm='4'>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
               <circle class="ragError" cx="7" cy="7" r="7"/>
            </svg>
            <label id="errors" class="ragNumber" >{{ report.errors }}</label>
          </b-col>
          <b-col cols='12' sm='4'>
             <svg height="14" width="14">
               <polygon class="ragWarning" points="0,14 7,0 14,14"/>
             </svg>
            <label id="warnings" class="ragNumber">{{ report.warnings }}</label>
          </b-col>
          <b-col cols='12' sm='4'>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <rect class="ragPass" width="14" height="14" fill="lime"/>
            </svg>
            <label id="passes" class="ragNumber">{{ report.passes }}</label>
          </b-col>
        </b-row>
      </b-col>
      <!--<div class="reportColumn center">
        <label class="qualityScore" >{{ report.qualityScore }}</label>
        <label>Quality Score</label>
      </div>-->
      <b-col v-bind:class='{open: isOpen} ' cols='12' sm='2' class="reportColumn center third fullSize">
        <div>
        <input id="viewReport + 'report.name'" type="button" value="View Report" @click="viewReport(report.id)" class="viewButton fullSize" />
        <!--<router-link id="viewReport + 'report.name'" type="button" :to="{name: 'listReportView' }" class="viewButton">View Report</router-link>-->
      </div>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import { convertDateTime } from '@/components/common/date.js';
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
      isOpen: true
    };
  },
  methods: {
    viewReport: function (id) {
      this.$router.push({name: 'listReportView', params: {'report': this.report, 'reportId': id}});
    },
    convertDateTime: convertDateTime,
    openTab: function () {
      this.isOpen = !this.isOpen;
    }
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
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reportMainColumn {
  padding: 10px;
}

.reportAction {
  min-width: 120px;
  display: inline-block;
}
.reportRow {

  max-height: 70px;
  padding: 0px 10px;
}

.columnTitle {
  font-weight: $bold;
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
  padding-right: 10px;
  padding-left: 14px;
}

.columnHeader {
  font-weight: $bold;
}

.ranOn {
  font-weight: $bold;
  font-size: 0.625em;
  margin-left: 20px;
  + label {
    font-size: 0.688em;
    margin-left: 20px;
  }
}

.ragNumber {
  vertical-align: top;
  font-size: 0.75em;
}

.profileName {
  font-size: 0.625em;
}

.reportName {
  font-size: 0.625em;
}

.user {
  font-size: 0.75em;
}

.first{
  order: 0;
}

.second{
  order : 0;
}

.third{
  order: 0;
}

.bottom-bar{
  border-bottom:1px solid #E5E5E5;
}
.open{
  display: flex;
}
.show{
  display: none;
}
@media (max-width: 376px){
  .first{
    order: 1;
  }
  .second{
    order: 2;
  }
  .third{
    order: 3;
    margin-top: 15px;
  }
  .show{
    display: block;
  }
  .open{
    display: none;
  }
  .ranOn {
    margin-left: 0px;
    + label {
      margin-left: 0px;
    }
  }

  .fullSize{
    width: 100%;
    text-align: center;
  }
}
</style>
