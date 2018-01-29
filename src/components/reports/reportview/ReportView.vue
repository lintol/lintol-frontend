<template>
   <div id='reportView'>
    <router-link id="reports" :to="{name: 'reportTable' }" class="navigateToReports"> &#x3008; Back to Reports</router-link>
    <div class="reportRow">
        <div class="reportMainColumn">
          <label class="pageTitle">{{ reportName }}</label>
          <p class='instructions'>
           This report was create from Data Resource {{ dataResourceName }} 
          </p>
        </div>
        <div class="reportColumn">
          <label class="ranOn columnHeader">Ran On</label>
          <label>{{ dateString }}</label>
        </div>
        <div class="reportColumn">
          <label id="creator" class="user"><img class="profilePicture alignImage" src="../../../assets/images/profile.png" /> {{ user }}</label>
        </div>
        <div class="reportColumn">
          <label class="qualityScore" >{{ qualityScore }}</label>
          <label>Quality Score</label>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ReportView',
  props: {
    reportId: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      reportName: 'Default Report Name',
      title: 'Report',
      dataResourceName: 'Default Resource Name',
      user: 'Default User',
      qualityScore: '-1',
      dateString: '00:00 01/01/2001'
    };
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
  },
  watch: {
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

.navigateToReports {
  font-size: 12px;
}
  
</style>
