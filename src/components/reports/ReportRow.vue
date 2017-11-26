<template>
  <div id="reports-row" class="shadedRow">
    <div class="reportRow">
      <div class="reportColumn center">
        <label>Profile</label>
        <p>{{ report.name }}</p>
      </div>
      <div class="reportColumn center">
        <label>Ran On</label>
        <p>{{ convertDate(report.created_at) }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ report.errors }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ report.warnings }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ report.passes }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ report.qualityScore }}</p>
      </div>
      <div class="reportColumn center">
        <input id="viewReport + 'report.name'" type="button" value="View Report" @click="viewReport" /> 
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
@import '../../assets/scss/application.scss';

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
  min-height: 80px;
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
}
 
.columnTitle {
  font-weight: bold;
}

.rightSeparator {
  border-right: grey 1px solid;
}

.shadedRow {
  border: 1px solid $rowBackground;
  border-radius: 3px;
  background-color: $rowBackground;
  margin: 20px;
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

</style>
