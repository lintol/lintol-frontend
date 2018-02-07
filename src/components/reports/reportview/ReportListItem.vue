<template>
  <div class="rowBorders">
    <div class="ragPosition">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
         <circle class="ragError" cx="10" cy="10" r="10"/>
      </svg>
    </div>
    <label class="processorName">{{ reportItem.processor }}</label>
    <label class="issueType">{{ reportItem.code }}</label>
    <label class="issueDescription">{{ reportItem.message }}</label>
    <label @click=openIssue class="moreDetails">More Details &#x3e;</label>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    reportItem: {
      type: Object,
      required: true
    },
    content: {
      type: String,
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
  methods: {
    openIssue: function () {
      console.log('Sending');
      console.log(this.content);
      if (JSON.parse(this.content).preset === 'geojson') {
        this.$router.push({name: 'mapDetails', params: {'reportId': this.reportId, 'reportItem': this.reportItem, 'reportMetaData': this.content}});
      } else {
        this.$router.push({name: 'tabularDetails', params: {'reportId': this.reportId, 'reportItem': this.reportItem, 'reportMetaData': this.content}});
        // this.$router.push({name: 'profileTable'});
      }
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
    console.log(this.reportItem);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/reports.scss';

.rowBorders {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: solid 2px black;
  border-radius: 20px;
  border: 1px solid #E3E3E3;
  border-radius: 40px;
  margin-top: 9px;
  padding: 13px 10px;
  font-size: 12px;
}

.processorName {
  font-weight: bold;
  flex: 0.5;
}

.issueType {
  color: #777776;
  font-weight: bold;
  flex: 0.5;
}

.issueDescription {
  color: #777776;
  flex: 2;
}

.moreDetails {
  flex: 0.5;
  cursor: pointer;
}

.ragPosition {
  flex: 0.1;
}
</style>
