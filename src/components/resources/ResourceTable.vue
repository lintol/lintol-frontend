<template>
  <div id="resourceTable" v-if="resources">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">
      The list of resources that have been validated by Lintol</p>
    </p>
    <p>Your Resources</p>
    <add-resource-block></add-resource-block>
    <div>
        <select id="userFilter" v-model="filteredType" >
          <option disabled value="" >Filter by Type</option>
          <option v-for="type in filterByTypeOptions">{{ type }}</option>
        </select>
        <select id="userFilter" v-model="filteredType" >
          <option disabled value="" >Filter by Type</option>
          <option v-for="type in filterByTypeOptions">{{ type }}</option>
        </select>
        <select id="userFilter" v-model="filteredProcessor" >
          <option disabled value="" >Filter by Processor</option>
          <option v-for="processor in filterByProcessorOptions">{{ processor }}</option>
        </select>
        <input id="searchValidations" type="text" class="searchBox" v-model="search"/>
        <div style="float: right;">
        <div class="actionContainer">
          <label class="rightSeparator">{{ selectedResources }} Selected </label>
          <select id="resourceAction" v-model="filteredType" >
            <option value="actionDropDown" >Choose Function</option>
          </select>
        </div>
        </div>
    </div>
    <div class="headerContainer greySeparator">
      <label>Resource Name</label>
      <label>File Type</label>
      <label>Stored</label>
      <label>Date Added</label>
      <label>Owner</label>
      <label>Status</label>
    </div>
    <div id="columns" class="flexContainer" v-if="resources">
      <resource-row :key="resource.id" :resource="resource" v-for="resource in resources" />
    </div>
  </div>
</template>

<script>
import { LOAD_DATA_RESOURCES } from '@/state/action-types';
import ResourceRow from './ResourceRow';
import AddResourceBlock from './AddResourceBlock';
export default {
  name: 'ResourceTable',
  data () {
    return {
      'title': 'Resources',
      filteredType: '',
      filteredProcessor: '',
      selectedResources: 12
    };
  },
  computed: {
    resources: function () {
      return this.$store.getters.dataResources;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_DATA_RESOURCES);
  },
  components: {
    ResourceRow: ResourceRow,
    AddResourceBlock: AddResourceBlock
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.actionContainer {
  display: flex;
  flex-direction: row;
  color: white;
  float: right;
  border-radius: 4px;
  background-color: #333333;
  font-size: 10px;
}

.actionDropDown {
}

.headerContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  > label {
    font-weight: bold;
  }
}

.greySeparator {
  border-bottom: 1px solid #EAE5E5;
  padding-bottom: 12px;
  margin: 10px;
}

.rightSeparator {
   border-right: 1px solid white;
   margin: 10px;
   padding: 0px 10px;
}

.searchBox {
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background: url(../../assets/images/search.svg) no-repeat scroll 5px 5px;
  background-color: white;
  background-position: 1px 1px; 
  background-repeat: no-repeat;
  border-color: #979797;
  &::placeholder {
    color: #9B9B9B;
  }
}
</style>
