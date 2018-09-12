<template>
   <div id="processorReportView processorReportView">
     <h3>Processors</h3>
     <div>
       <div id="reportResultDetails" class="reportColumn ragDisplay">
          <div>
            <label>{{ issues }} Issues</label>
          </div>
          <div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
             <circle class="ragError" cx="10" cy="10" r="10"/>
          </svg>
          <label id="errors" style="vertical-align: top;" >{{ errors }}</label>
          </div>
          <div>
           <svg height="20" width="20">
             <polygon class="ragWarning" points="0,20 10,0 20,20"/>
           </svg>
          <label id="warnings" style="vertical-align: top;">{{ warnings }}</label>
          </div>
          <div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <rect class="ragPass" width="20" height="20" fill="lime"/>
          </svg>
          <label id="passes" style="vertical-align: top;">{{ passes }}</label>
          </div>
       </div>
     </div>
     <div class="processorResultBoxes">
       <processor-result-box :key=index v-for="(processorResult, index) in processorResults"></processor-result-box> 
       <processor-result-box class="processorResultBoxes"></processor-result-box> 
     </div>
     <div>
       <processor-validation-group :key=index v-for="(processorResult, index) in processorResults" :proceesorName="processorResult.name" :numberOfErrors="processorResult.errors"></processor-validation-group> 
       <processor-validation-group ></processor-validation-group> 
     </div>
     <div>
       <input id="searchValidations" type="text" class="searchBox" />
       <select id="userFilter" v-model="filteredType" >
         <option disabled value="" >Filter by Type</option>
         <option v-for="type in filterByTypeOptions">{{ type }}</option>
       </select>
       <select id="userFilter" v-model="filteredProcessor" >
         <option disabled value="" >Filter by Processor</option>
         <option v-for="processor in filterByiProcessorOptions">{{ processor }}</option>
       </select>
     </div>
  </div>
</template>

<script>
import ProcessorValidationGroup from './ProcessorValidationGroup';
import ProcessorResultBox from './ProcessorResultBox';

export default {
  name: 'ReportView',
  props: {
    issues: {
      type: Number,
      required: false,
      default: -1
    },
    errors: {
      type: Number,
      required: false,
      default: -1
    },
    warnings: {
      type: Number,
      required: false,
      default: -1
    },
    passes: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data () {
    return {
      filteredType: '',
      filteredProcessor: '',
      processorResults: []
    };
  },
  components: {
    ProcessorResultBox: ProcessorResultBox,
    ProcessorValidationGroup: ProcessorValidationGroup
  },
  computed: {
    filterByTypeOptions: function () {
      return [];
    },
    filterByiProcessorOptions: function () {
      return [];
    }
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
.processorResultBoxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.processorReportView {
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
}
</style>
