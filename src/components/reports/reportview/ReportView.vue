<template>
   <div id='reportView'>
    <div class="reportRow">
        <div class="reportColumn">
          <h1>{{ reportName }}</h1>
          <p class='instructions'>
           This report was create from Data Resource {{ dataResourceName }} 
          </p>
        </div>
        <div class="reportColumn">
          <label class="ranOn columnHeader">Ran On</label>
          <label>{{ dateString }}</label>
        </div>
        <div class="reportColumn">
          <p id="creator" ><img class="profilePicture" src="../../../assets/images/profile.png"> {{ user }}</p>
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
