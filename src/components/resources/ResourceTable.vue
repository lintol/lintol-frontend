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
      <label class="resourceName" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filename')" >Resource Name</label>
      <label class="fileType" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filetype')">File Type</label>
      <label class="stored":class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('stored')">Stored</label>
      <label class="dateAdded" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]" @click="sort('created_at')">Date Added</label>
      <label class="owner" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('owner')">Owner</label>
      <label class="status" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('status')">Status</label>
      <label class="actionButton"></label>
    </div>
    <div id="columns" class="flexContainer" v-if="resources">
      <resource-row :key="resource.id" :resource="resource" :index=index v-for="(resource, index) in orderedResources" />
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
      search: '',
      selectedResources: 12,
      sortBy: '',
      ascDesc: 'asc'
    };
  },
  methods: {
    sort: function (sortBy) {
      this.sortBy = sortBy;
      this.revertAscDesc();
      console.log('Sort By:' + sortBy + ' ascDesc:' + this.ascDesc);
    },
    revertAscDesc: function () {
      if (this.ascDesc === 'asc') {
        this.ascDesc = 'desc';
      } else {
        this.ascDesc = 'asc';
      }
    }
  },
  computed: {
    resources: function () {
      return this.$store.getters.dataResources;
    },
    orderedResources: function () {
      return this.$lodash.orderBy(this.resources, this.sortBy, this.ascDesc);
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
@import './table.scss';
 
.arrowDown:after {
  content: '\2193';
  font-size: 25px;
  font-weight: bold;
}

.arrowUp:after {
  content: '\2191';
  font-size: 25px;
  font-weight: bold;
}

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
