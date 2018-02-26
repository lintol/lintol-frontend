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
        <select id="storedFilter" v-model="selectedStored" >
          <option disabled value="" >Filter by Stored</option>
          <option v-for="stored in filterByStoredOptions">{{ stored }}</option>
        </select>
        <select id="dateFilter" v-model="selectedDate" >
          <option disabled value="" >Filter by Date</option>
          <option v-for="date in dateList">{{ date }}</option>
        </select>
        <input id="searchValidations" type="text" class="searchBox" v-model="search"/>
        <div style="float: right;">
        <div class="actionContainer">
          <label class="rightSeparator">{{ selectedResources.length }} Selected </label>
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
      <label class="resourceName" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filename')" >Resource Name</label>
      <label class="fileType" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filetype')">File Type</label>
      <label class="stored":class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('stored')">Stored</label>
      <label class="dateAdded" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]" @click="sort('created_at')">Date Added</label>
      <label class="owner" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('owner')">Owner</label>
      <label class="status" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('status')">Status</label>
      <label class="actionButton"></label>
    </div>
    <div id="columns" class="flexContainer" v-if="resources">
      <resource-row v-if="resource.archived==0" :key="resource.id" :resource="resource" :index="resource.id" v-for="(resource, index) in filteredResources" :clearSelected=clearSelected @resourceSelected="selectedResource"/>
    </div>
    <paginate :page-count="2" :margin-pages="2" :click-handler=getResources :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"> </paginate> 
    </div>
</template>

<script>
import { LOAD_DATA_RESOURCES, SAVE_DATA_RESOURCE } from '@/state/action-types';
import ResourceRow from './ResourceRow';
import AddResourceBlock from './AddResourceBlock';
import { convertDate, filter, selectedFiltered } from '@/components/common/date.js';

export default {
  name: 'ResourceTable',
  data () {
    return {
      'title': 'Resources',
      selectedType: '',
      selectedStored: '',
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
      this.clearSelected = true;
      if (e.target.value === 'runProfile') {
        console.log('runProfile');
      }
      if (e.target.value === 'archive') {
        var archivedResource = this.selectedResources[0];
        console.log(this.selectedResources[0]);
        archivedResource.archived = '1';
        this.$store.dispatch(SAVE_DATA_RESOURCE, archivedResource).then(() => {
        });
        console.log('Archived');
      }
      if (e.target.value === 'delete') {
        console.log('delete');
      }
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
      this.$store.dispatch(LOAD_DATA_RESOURCES, pageNum);
    }
  },
  computed: {
    resources: function () {
      return this.$store.getters.dataResources;
    },
    orderedResources: function () {
      return this.$lodash.orderBy(this.resources, this.sortBy, this.ascDesc);
    },
    filteredResources: function () {
      var result = this.orderedResources;
      result = selectedFiltered(result, this.selectedDate, 'created_at');
      result = selectedFiltered(result, this.selectedStored, 'stored');
      result = selectedFiltered(result, this.selectedType, 'filetype');
      try {
        var re = new RegExp(this.search);
        result = result.filter((resource) => {
          return re.exec(resource.filename);
        });
      } catch (e) {
        console.log(e);
        return this.orderedResources;
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
    filterByStoredOptions: function () {
      return filter(this.resources, 'stored');
    },
    filterByTypeOptions: function () {
      return filter(this.resources, 'filetype');
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_DATA_RESOURCES, 1);
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
