<template>
   <div id="processorTable">
    <div >
      <button id="addNewProcessorButton" class="addButton" @click="addProcessor">Add new Data Processor <label>&#10133;</label></button>
      <h1>{{ title }}</h1>
      <p class="instructions">
        These are the list of processors available to your profiles. 
      </p>
      <input id="processorSearch" class="processorSearch" placeholder="Search for a Processor" type="Search" v-model="search">
      <label class="numberOfProcessors">{{ filteredProcessors.length }} Processors</label>
      <div id="noProcessorsAvailable" v-if="filteredProcessors.length == 0">
        <p class="instructions"> No Processors available for this account</p>
      </div>
      <div id="columns"  v-else class="flexContainer">
        <processor-row :key="processor.name" v-for="processor in filteredProcessors" :processor="processor"></processor-row>
      </div>
    </div>
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
      title: 'Processors',
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
      return this.processors.filter((event) => {
        return event.name.startsWith(this.search);
      });
    },
    processors: function () {
      return this.$store.state.processors;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROCESSORS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.processorSearch {
  width: 50%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}

.numberOfProcessors {
 color: $greyFont;
 float: right;
 font-weight: bold;
}
</style>
