<template>
  <div>
    <h4>{{ processorName }}</h4>
    <h5>{{ numberOfErrors }} ERRORS</h5>
    <validation-errors :key="index" v-for="(index, validationObject) in validationObjects" :validationObject="validationObject"></validation-errors>
  </div>
</template>

<script>
import ValidationErrors from './ValidationErrors';
export default {
  name: 'ProcessorValidationGroup',
  props: {
    processorName: {
      type: String,
      required: false,
      default: 'Default Processor Name'
    },
    numberOfErrors: {
      type: Number,
      required: false,
      default: -1
    },
    validationObjects: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
    ValidationErrors: ValidationErrors
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

</style>
