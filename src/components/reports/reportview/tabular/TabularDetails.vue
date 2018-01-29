<template>
   <div id='tabularDetails'>
    <div >
      <p class="processor">{{ reportItem.processor }}</p>
      <p class="itemType">{{ reportItem.code }}</p>
      <div id='report'/>
    </div>
  </div>
</template>

<script>
// import { LOAD_REPORT } from '@/state/action-types';
import goodtablesUI from 'goodtables-ui';

export default {
  name: 'TabularDetails',
  props: {
    reportMetaData: {
      type: String,
      required: true
    },
    reportItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    };
  },
  components: {
  },
  methods: {
    setOneError: function (content) {
      console.log(content['error-count']);
      content['error-count'] = '1';
      content.tables[0]['row-count'] = 1;
      content.tables[0]['error-count'] = 1;
      content.tables[0]['errors'] = [];
      content.tables[0].errors.push(this.reportItem);
      return content;
    }
  },
  computed: {
    /* report: function () {
      var report = this.$store.state.currentReport;
      return report;
    } */
  },
  mounted: function () {
    // this.$store.dispatch(LOAD_REPORT, this.reportId);
    const element = document.getElementById('report');
    var content = this.setOneError(JSON.parse(this.reportMetaData));
    goodtablesUI.render(goodtablesUI.Report, {report: content}, element);
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';

.processor {
  font-size: 17px;
  color: #333333;
  font-weight: bold;
}

.itemType {
  font-size: 12px;
  color: #777776;
  font-weight: bold;
}

.goodtables-ui-report .panel-danger>.panel-heading {
    color: #2f3135;
    background-color: #695d5e;
    border-color: #f13c3f;
}
</style>
