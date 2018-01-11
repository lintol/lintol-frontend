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

export default {
  name: 'TabularDetails',
  props: {
    processorName: {
      type: String,
      required: true
    },
    processorName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    };
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
    this.$store.dispatch(LOAD_REPORT, this.reportId);
  },
  watch: {
    report: function () {
      const element = document.getElementById('report');
      var content = JSON.parse(this.report.attributes.content[0])[0]['goodtables:all'][2];
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
