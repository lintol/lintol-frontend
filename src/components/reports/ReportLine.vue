<template>
  <div id="reports-row" class="shadedRow">
    <div class="reportRow">
      <div class="reportColumn center">
        <div class="rightSeparator">
          <label class="columnHeader">Profile</label>
          <p>{{ report.name }}</p>
        </div>
      </div>
      <div class="reportColumn center">
        <label class="ranOn columnHeader">Ran On</label>
        <label v-if="report.createdAt">{{ convertDate(report.createdAt) }}</label>
      </div>
      <div class="reportColumn center">
        <p id="creator" ><img class="profilePicture" src="../../assets/images/profile.png"> {{ report.user }}</p>
      </div>
      <div class="reportColumn ragDisplay">
        <label for="errors" class="rag errors"></label>
        <p id="errors">{{ report.errors }}</p>
        <label for="warnings" class="rag warnings"></label>
        <p id="warnings" >{{ report.warnings }}</p>
        <label for="passes" class="rag passes"></label>
        <p id="passes">{{ report.passes }}</p>
      </div>
      <div class="reportColumn center">
        <label class="qualityScore" >{{ report.qualityScore }}</label>
        <label>Quality Score</label>
      </div>
      <div class="reportColumn center">
        <div>
        <input id="viewReport + 'report.name'" type="button" value="View Report" @click="viewReport" class="viewButton"/> 
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
    convertDate: function (dateString) {
      return moment(dateString).format('Do MMMM YYYY');
    },
    viewReport: function () {
      // $router.push(); push to new page/component with report details.
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/reports.scss';

.reportColumn {
  min-width: 150px;
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
  min-height: 100px;
  padding: 0px 10px;
}
 
.columnTitle {
  font-weight: bold;
}

.rightSeparator {
  border-right: grey 1px solid;
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
</style>
