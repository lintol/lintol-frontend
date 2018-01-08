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
        <label>{{ convertDate(report.created_at) }}</label>
      </div>
      <div class="reportColumn center">
        <p id="creator" ><img class="profilePicture" src="../../assets/images/profile.png"> {{ report.user }}</p>
      </div>
      <div class="reportColumn ragDisplay">
        <div>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
           <circle class="ragError" cx="10" cy="10" r="10"/>
        </svg>
        <label id="errors" style="vertical-align: top;" >{{ report.errors }}</label>
        </div>
        <div>
         <svg height="20" width="20">
           <polygon class="ragWarning" points="0,20 10,0 20,20"/>
         </svg> 
        <label id="warnings" style="vertical-align: top;">{{ report.warnings }}</label>
        </div>
        <div>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <rect class="ragPass" width="20" height="20" fill="lime"/>
        </svg>
        <label id="passes" style="vertical-align: top;">{{ report.passes }}</label>
        </div>
      </div>
      <div class="reportColumn center">
        <label class="qualityScore" >{{ report.qualityScore }}</label>
        <label>Quality Score</label>
      </div>
      <div class="reportColumn center">
        <div>
        <input id="viewReport + 'report.name'" type="button" value="View Report" @click="viewReport(report.id)" class="viewButton"/> 
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
    viewReport: function (id) {
      this.$router.push({name: 'reportView', params: {'reportId': id}});
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
@import '../../assets/scss/application.scss';
@import '../../assets/scss/reports.scss';

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

.ranOn {
  font-weight: bold;
  text-align: center;
  + label {
    text-align: center;
  }
}

.qualityScore {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  + label {
    text-align: center;
  }
}

</style>
