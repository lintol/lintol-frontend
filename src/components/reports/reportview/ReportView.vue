<template>
   <div id='reportView'>
    <div class="reportRow" v-if="report">
        <div class="reportColumn">
          <h1>{{ report.name }}</h1>
          <p class='instructions' v-if="report.dataResource">
          This report was created from Data Resource:<br/>{{ report.dataResource.name }}
          </p>
        </div>
        <div class="reportColumn">
          <label class="ranOn columnHeader">Ran On</label>
          <label>2018-01-01</label>
        </div>
        <div class="reportColumn">
          <p id="creator" ><img class="profilePicture" src="../../../assets/images/profile.png"> {{ report.creatorId }}</p>
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
export default {
  name: 'ReportView',
  computed: {
    report: function () {
      return this.$store.state.currentReport;
    }
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

.reportRow {
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   justify-content: space-between;
   min-height: 100px;
   padding: 0px 10px;
 }

.ranOn {
  font-weight: bold;
  text-align: center;
  + label {
    text-align: center;
  }
}

.reportColumn {
  min-width: 150px;
  flex: 1;
}


</style>
