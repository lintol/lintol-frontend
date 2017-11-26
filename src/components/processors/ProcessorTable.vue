<template>
   <div id="processorTable">
    <div >
      <button id="addNewProcessorButton" class="addProcessorButton" @click="addProcessor">Add new Data Processor +</button>
      <h1>{{ title }}</h1>
      <p class="instructions">
        Instructions
      </p>
      <label for="processorSearch">Filter:</label>
      <input id="processorSearch" type="text" v-model="search">
      <!-- tables -->
      <div id="headings"  class="headerContainer tableSeparator">
        <label class="flexHeading">Name</label> 
        <label class="flexHeading">Description</label> 
        <label class="flexHeading">Created</label> 
        <label class="flexHeading">Last Updated</label> 
        <label class="flexHeading">Unique Tag</label> 
      </div>
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
import axios from 'axios';
import ProcessorRow from './ProcessorRow';
export default {
  name: 'ProcessorTable',
  props: {
  },
  data () {
    return {
      title: 'Processors',
      search: '',
      processors: []
    };
  },
  methods: {
    getProcessors: function () {
      axios.get(this.$apiPrefix + '/processors/').then(response => {
        this.processors = response.data;
      }, response => {
        console.log('Couldnt get processors.');
      });
    },
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
    }
  },
  mounted: function () {
    this.getProcessors();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

</style>
