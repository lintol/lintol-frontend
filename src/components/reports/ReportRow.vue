<template>
  <div id="reports-row" class="shadedRow">
    <div class="reportRow">
      <div class="reportColumn center">
        <label>{{ report.name }}</label>
      </div>
      <div class="reportColumn center">
        <label>{{ report.description }}</label>
      </div>
      <div class="reportColumn center">
        <p>{{ convertDate(report.created_at) }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ convertDate(report.updated_at) }}</p>
      </div>
      <div class="reportColumn center">
        <p>{{ report.uniqueTag }}</p>
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
