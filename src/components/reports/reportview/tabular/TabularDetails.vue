<template>
   <div id='tabularDetails'>
    <div >
      <h3>{{ processorName }}</h3>
      <h4>{{ validationName }}</h4>
      <div id='report'/>
    </div>
  </div>
</template>

<script>
import { LOAD_REPORT } from '@/state/action-types';
import goodtablesUI from 'goodtables-ui';

export default {
  name: 'TabularDetails',
  props: {
    reportId: {
      type: String,
      required: true
    },
    processorName: {
      type: String,
      required: false,
      default: 'Processor Name'
    },
    validationName: {
      type: String,
      required: false,
      default: 'Validation Name'
    }
  },
  data () {
    return {
    };
  },
  components: {
  },
  computed: {
    report: function () {
      var report = this.$store.state.currentReport;

      return report;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_REPORT, this.reportId);
  },
  watch: {
    report: function () {
      const element = document.getElementById('report');
      var content = this.report.content;
      console.log(content);
      goodtablesUI.render(goodtablesUI.Report, {report: content}, element);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';

</style>
