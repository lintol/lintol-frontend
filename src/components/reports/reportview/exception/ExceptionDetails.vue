<template>
   <div>
   <router-link id="reports" :to="{name: 'listReportView', params: {'reportId': this.reportId}}" class="navigateToReports"> &#x3008; Back to List</router-link>
   <div id='exceptionDetails'>
    <div >
      <p class="processor">{{ reportItem.processor }}</p>
      <p class="itemType">{{ reportItem.code }}</p>
      <div>
        <pre>{{ reportItem['error-data']['keyword arguments'].message }}</pre>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ExceptionDetails',
  props: {
    reportMetaData: {
      type: String,
      required: true
    },
    reportItem: {
      type: Object,
      required: true
    },
    reportId: {
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
  methods: {
  },
  computed: {
  },
  mounted: function () {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';

.processor {
  font-size: 17px;
  color: #333333;
  font-weight: $bold;
}

.itemType {
  font-size: 12px;
  color: #777776;
  font-weight: $bold;
}

.navigateToReports {
  font-size: 12px;
}
</style>
