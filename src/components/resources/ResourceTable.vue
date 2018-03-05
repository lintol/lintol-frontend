<template>
  <div id="resourceTable" v-if="resources">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">
      The list of resources that have been validated by Lintol</p>
    </p>
    <add-resource-block v-on:addResource="addResourceAction"></add-resource-block>
    <p class="subHeading">Your Resources</p>
    <div>
        <select id="typeFilter" v-model="selectedType" >
          <option disabled value="" >Filter by Type</option>
          <option v-for="type in filterByTypeOptions">{{ type }}</option>
        </select>
        <select id="sourceFilter" v-model="selectedSource" >
          <option disabled value="" >Filter by Source</option>
          <option v-for="source in filterBySourceOptions">{{ source }}</option>
        </select>
        <select id="dateFilter" v-model="selectedDate" >
          <option disabled value="" >Filter by Date</option>
          <option v-for="date in dateList">{{ date }}</option>
        </select>
        <input id="searchValidations" type="text" class="searchBox" v-model="search"/>
        <div style="float: right;">
        <label>Resources {{ filteredResources.length }}</label>
        <div class="actionContainer">
          <label id="numberOfSelectedResources" class="rightSeparator">{{ selectedResources.length }} Selected </label>
          <select id="resourceAction" class="blackDropDown" v-model="action" @click=resourceAction>
            <option value="" >Choose Function</option>
            <option value="runProfile">Run Profile</option>
            <option value="archive" >Archive</option>
            <option value="delete" >Delete</option>
          </select>
        </div>
        </div>
    </div>
    <div class="headerContainer greySeparator">
      <label class="filenameHeader" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filename')" >Resource Name</label>
      <label class="fileType" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filetype')">File Type</label>
      <label class="source":class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('source')">Source</label>
      <label class="dateAdded" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]" @click="sort('created_at')">Date Added</label>
      <label class="owner" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('owner')">Owner</label>
      <label class="status" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('status')">Status</label>
      <label class="actionButton"></label>
    </div>
    <div id="columns" class="flexContainer" v-if="resources">
      <resource-row v-if="resource.archived==0" :key="resource.id" :resource="resource" :index="resource.id" v-for="(resource, index) in filteredResources" :clearSelected=clearSelected @resourceSelected="selectedResource"/>
    </div>
    <paginate :initial-page="0" :page-count="2" :margin-pages="2" :click-handler=getResources :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"> </paginate> 
    </div>
</template>

<script>
import { UPDATE_DATA_RESOURCES_FILTERS, UPDATE_DATA_RESOURCES_PAGE, LOAD_DATA_RESOURCES, SAVE_DATA_RESOURCE, DELETE_DATA_RESOURCE } from '@/state/action-types';
import ResourceRow from './ResourceRow';
import AddResourceBlock from './AddResourceBlock';
import { convertDate, filter, selectedFiltered } from '@/components/common/date.js';

export default {
  name: 'ResourceTable',
  data () {
    return {
      'title': 'Resources',
      selectedType: '',
      selectedSource: '',
      selectedDate: '',
      search: '',
      action: '',
      selectedResources: [],
      sortBy: '',
      ascDesc: 'asc',
      clearSelected: false
    };
  },
  methods: {
    convertDate: convertDate,
    addResourceAction: function (resourceType) {
      this.$store.dispatch(LOAD_DATA_RESOURCES, 1);
    },
    sort: function (sortBy) {
      this.sortBy = sortBy;
      this.revertAscDesc();
      console.log('Sort By:' + sortBy + ' ascDesc:' + this.ascDesc);
    },
    resourceAction: function (e) {
      if (e.target.value === 'runProfile') {
        console.log('runProfile');
      }
      if (e.target.value === 'archive') {
        var archivedResource = this.selectedResources[0];
        archivedResource.archived = '1';
        this.$store.dispatch(SAVE_DATA_RESOURCE, archivedResource).then(() => {
        });
      }
      if (e.target.value === 'delete') {
        var decision = confirm('Please confirm you want to delete these resources!');
        if (decision) {
          var deleteResource = this.selectedResources[0];
          this.$store.dispatch(DELETE_DATA_RESOURCE, deleteResource).then(() => {
            var index = this.selectedResources.indexOf(deleteResource);
            console.log('selected index:' + index);
            this.selectedResources.splice(index, 1);
            index = this.resources.indexOf(deleteResource);
            console.log('resource index:' + index);
            this.filteredResources.splice(index, 1);
          }).catch((error) => {
            console.log('Error deleting resource:' + error);
          });
        }
      }
      this.action = '';
      this.clearSelected = true;
    },
    selectedResource: function (selectedResource) {
      var index = this.selectedResources.indexOf(selectedResource);
      console.log('Index found:' + index);
      if (index === -1) {
        this.selectedResources.push(selectedResource);
      } else {
        this.selectedResources.splice(index, 1);
      }
    },
    revertAscDesc: function () {
      if (this.ascDesc === 'asc') {
        this.ascDesc = 'desc';
      } else {
        this.ascDesc = 'asc';
      }
    },
    getResources: function (pageNum) {
      console.log(pageNum);
      this.$store.dispatch(UPDATE_DATA_RESOURCES_PAGE, pageNum);
    }
  },
  computed: {
    resources: function () {
      return this.$store.getters.dataResources;
    },
    orderedResources: function () {
      return this.$lodash.orderBy(this.resources, this.sortBy, this.ascDesc);
    },
    filters: function () {
      var filters = {};

      if (this.selectedDate) {
        filters['created_at'] = this.selectedDate;
      }

      if (this.selectedDate) {
        filters['source'] = this.selectedSource;
      }

      if (this.selectedType) {
        filters['filetype'] = this.selectedType;
      }

      if (this.search) {
        filters['search'] = this.search;
      }

      return filters;
    },
    filteredResources: function () {
      var result = this.orderedResources;

      result = selectedFiltered(result, this.selectedDate, 'created_at');
      result = selectedFiltered(result, this.selectedSource, 'source');
      result = selectedFiltered(result, this.selectedType, 'filetype');

      if (this.search) {
        try {
          var re = new RegExp(this.search);
          result = result.filter((resource) => {
            return re.exec(resource.filename);
          });
        } catch (e) {
          console.log(e);
          return this.orderedResources;
        }
      }

      return result;
    },
    dateList: function () {
      var dateList = [];
      this.orderedResources.filter((event) => {
        if (dateList.indexOf(convertDate(event.created_at)) === -1) {
          dateList.push(convertDate(event.created_at));
        }
      });
      return dateList;
    },
    filterBySourceOptions: function () {
      return filter(this.resources, 'source');
    },
    filterByTypeOptions: function () {
      return filter(this.resources, 'filetype');
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_DATA_RESOURCES, 1);
  },
  watch: {
    filters: function (filters) {
      this.$store.dispatch(UPDATE_DATA_RESOURCES_FILTERS, filters);
    }
  },
  components: {
    ResourceRow: ResourceRow,
    AddResourceBlock: AddResourceBlock
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import './table.scss';

.blackDropDown {
  background-color: #333333;
  color: white;
  border: none;
  outline: none;
}
 
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
  > label {
    font-weight: bold;
  }
}

.greySeparator {
  border-bottom: 1px solid #EAE5E5;
  margin: 10px 10px;
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
  background: url(../../assets/images/search.svg) no-repeat scroll 13px 13px;
  background-color: white;
  background-position: right; 
  background-repeat: no-repeat;
  border-color: #979797;
  &::placeholder {
    color: #9B9B9B;
  }
}

.subHeading {
  font-size: 18px;
  font-weight: bold;
}
</style>
