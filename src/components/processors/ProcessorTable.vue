<template>
   <div id="processorTable" v-if="filteredProcessors">
    <b-row style='margin-right: 10px;'>
      <b-col cols='12'>
        <label class="pageTitle">{{ title }}</label>
        <p class="instructions">
          These are the list of processors available to your profiles.
        </p>
      </b-col>
      <b-col cols='12' sm='4'>
        <b-form-input id="processorSearch" class="processorSearch" placeholder="Search for a Processor" type="Search" v-model="search"/>
      </b-col>
      <b-col cols='12' sm='2' offset-sm="5">
        <label class="numberOfProcessors">{{ filteredProcessors.length }} Processors</label>
      </b-col>
      <b-col cols='12'>
        <div id="noProcessorsAvailable" v-if="filteredProcessors.length == 0">
          <p class="instructions"> No Processors available for this account</p>
        </div>
        <div id="columns"  v-else class="flexContainer">
          <processor-row :key="processor.id" v-for="processor in filteredProcessors" :processor="processor"></processor-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProcessorRow from './ProcessorRow';
import { LOAD_PROCESSORS } from '@/state/action-types';

export default {
  name: 'ProcessorTable',
  props: {
  },
  data () {
    return {
      title: 'Data Processors',
      search: ''
    };
  },
  methods: {
    addProcessor: function () {
      this.$router.push({name: 'addProcessor'});
    }
  },
  components: {
    ProcessorRow: ProcessorRow
  },
  computed: {
    filteredProcessors: function () {
      try {
        var re = new RegExp(this.search);
        return this.processors.filter((processor) => {
          return re.exec(processor.name);
        });
      } catch (e) {
        return this.processors;
      }
    },
    processors: function () {
      return this.$store.getters.processors;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROCESSORS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

.processorSearch {
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 0.8125em;
  background: url(../../assets/images/search.svg) no-repeat scroll 0.875em 0.875em;
  background-color: white;
  background-position: 0.3125em 0.8375em;
  background-repeat: no-repeat;
  padding-left: 1.6625em;
  padding-top: 0.625em;
  padding-bottom: 0.625em;
  border-color: #979797;
  &::placeholder {
    color: #9B9B9B;
    font-size: 0.8125em;
  }
}

.numberOfProcessors {
 color: $greyFont;
 font-weight: bold;
 font-size: 0.875em;
}
</style>
