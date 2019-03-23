<template>
  <div id="resourceTable">
    <b-row>
      <b-col cols='12'>
        <label class="pageTitle">{{ title }}</label>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols='12'>
        <p class="instructions">
          The list of resources that are available for validation by Lintol
        </p>
      </b-col>
    </b-row>
    <add-resource-block v-on:addResource="addResourceAction"></add-resource-block>
    <b-row>
      <b-col>
        <label class="subHeading">Your Resources</label>
      </b-col>
    </b-row>
    <!--<label>(36 Archived)</label>-->
    <b-row class="filterContainer">
      <b-col cols='12' sm='10' md='12' lg='9'>
        <b-row class="btn-group">
          <b-col sm='12' cols='12' md='3'>
              <select id="typeFilter" class="custom-select" v-model="selectedType" >
                <option disabled value="" >Filter by Type</option>
                <option :value="type" v-for="(desc, type) in filterByTypeOptions" :key="type">{{ desc }}</option>
              </select>
          </b-col>
          <b-col sm='12' cols='12' md='3'>
            <select id="sourceFilter" class="custom-select"  v-model="selectedSource" >
              <option disabled value="" >Filter by Source</option>
              <option :value="source" v-for="(desc, source) in filterBySourceOptions" :key="source">{{ desc }}</option>
            </select>
          </b-col>
          <b-col sm='12' cols='12' md='3'>
            <select id="dateFilter" class="custom-select" v-model="selectedDate" >
              <option disabled value="" >Filter by Date</option>
              <option v-for="date in dateList" :value="date[0]" :key="date[0]">{{ date[1] }}</option>
            </select>
          </b-col>
          <b-col sm='12' cols='12' md='3' >
            <input id="searchValidations" type="text" class="searchBox" v-model="search" style='margin-bottom:3px;'/>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols='12' sm='2' md='1' lg='3'>
        <div class="actionContainer" >
          <label id="numberOfSelectedResources" class="rightSeparator numberOfSelected">{{ selectedResources.length }} Selected </label>
          <select id="resourceAction" class="blackDropDown" v-model="action" @click=resourceAction :disabled="noResourcesSelected">
            <option value="" >Choose Function</option>
            <option value="runProfile">Run Profile</option>
            <option value="archive" >Archive</option>
            <option value="delete" >Delete</option>
          </select>
        </div>
      </b-col>
    </b-row>
    <div>
      <div class="headerContainer greySeparator">
        <label class="filenameHeader" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filename')" >Resource Name</label>
        <label class="fileType" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('filetype')">File Type</label>
        <label class="source" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('source')">Source</label>
        <label class="dateAdded" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]" @click="sort('created_at')">Date Added</label>
        <label class="owner" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('owner')">Owner</label>
        <label class="status" :class="[ ascDesc == 'asc' ? 'arrowDown' : 'arrowUp' ]"  @click="sort('status')">Status</label>
        <label class="actionButton">Action</label>
      </div>
      <div id="columns" class="flexContainer" v-if="resources">
        <div v-for="(resource)  in resources" :key="resource.id">
          <resource-row v-if="resource.archived==0"  :resource="resource" :index="resource.id" :clearSelected=clearSelected @resourceSelected="selectedResource"/>
        </div>
        <paginate :initial-page="0" :page-count="resourcePages" :margin-pages="2" :click-handler=getResources :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'"> </paginate>
      </div>
      <div v-else>
        <p class="noResourcesCentered">No resources</p>
      </div>
      <b-modal id="chooseFunctionModal" ref="chooseFunctionModal" title="Select Profile">
        <b-container>
          <b-row>
            <b-col cols="12" class="mt-3">
              <select v-model="selectedProfileId" class="custom-select">
                <option disabled selected value="">[Choose Profile]</option>
                <option :value="profile.id" v-for="profile in profiles" :key="profile.id">{{ profile.name }}</option>
              </select>
            </b-col>
          </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <b-button  class="runProfileButton" data-dismiss="modal" v-on:click="matchDataResourcesToProfile">Run Profile</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  UPDATE_DATA_RESOURCES_FILTERS,
  UPDATE_DATA_RESOURCES_PAGE,
  LOAD_DATA_RESOURCES,
  SAVE_DATA_RESOURCE,
  DELETE_DATA_RESOURCE,
  STORE_SETTING_PROFILE_ID_FOR_DATA_RESOURCES,
  LOAD_PROFILES,
  LOAD_LOGGED_IN_USER,
  UPDATE_DATA_RESOURCES_SORT,
  UPDATE_DATA_RESOURCES_ORDER
} from '@/state/action-types';
import ResourceRow from './ResourceRow';
import AddResourceBlock from './AddResourceBlock';
import { convertDate, convertToTimeStamp } from '@/components/common/date.js';

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
      selectedProfileId: null,
      sortBy: '',
      ascDesc: 'asc',
      clearSelected: false
    };
  },
  methods: {
    convertDate: convertDate,
    addResourceAction: function (resourceType) {
      this.$store.dispatch(LOAD_DATA_RESOURCES, { reset: true, page: 1 });
    },
    sort: function (sortBy) {
      this.sortBy = sortBy;
      this.revertAscDesc();
    },
    matchDataResourcesToProfile () {
      var resources = this.selectedResources;
      this.$store.dispatch(STORE_SETTING_PROFILE_ID_FOR_DATA_RESOURCES, {
        profileId: this.selectedProfileId,
        resources: resources
      });
      this.selectedResources = [];
    },
    resourceAction: function (e) {
      if (e.target.value === 'runProfile') {
        this.$refs.chooseFunctionModal.show();
      }
      if (e.target.value === 'archive') {
        var archivedResource = this.selectedResources[0];
        archivedResource.archived = '1';
        this.$store.dispatch(SAVE_DATA_RESOURCE, archivedResource);
      }
      if (e.target.value === 'delete') {
        var decision = confirm('Please confirm you want to delete these resources!');
        this.delete(decision);
      }
      this.action = '';
      this.clearSelected = true;
      this.selectedProfileId = '';
    },
    delete: function (decision) {
      if (decision) {
        var deleteResource = this.selectedResources[0];
        this.$store.dispatch(DELETE_DATA_RESOURCE, deleteResource).then(() => {
          var index = this.selectedResources.indexOf(deleteResource);
          this.selectedResources.splice(index, 1);
          index = this.resources.indexOf(deleteResource);
          this.filteredResources.splice(index, 1);
        }).catch((error) => {
          console.log('Error deleting resource:' + error);
        });
      }
    },
    selectedResource: function (selectedResource) {
      var index = this.selectedResources.indexOf(selectedResource);
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
      this.$store.dispatch(UPDATE_DATA_RESOURCES_PAGE, pageNum);
    }
  },
  computed: {
    profiles: function () {
      return this.$store.getters.profiles;
    },
    resourcePages: function () {
      return this.$store.getters.dataResourcePageCount;
    },
    resources: function () {
      return this.$store.getters.dataResources;
    },
    loggedInUser: function () {
      return this.$store.state.loggedInUser;
    },
    filters: function () {
      var filters = {};

      if (this.selectedDate) {
        filters['created_at'] = this.selectedDate;
      }

      if (this.selectedSource) {
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
    dateList: function () {
      var dateList = [];
      var datePairs = [];
      this.resources.filter((event) => {
        if (event.created_at && dateList.indexOf(convertDate(event.created_at.date)) === -1) {
          datePairs.push([convertToTimeStamp(event.created_at.date), convertDate(event.created_at.date)]);
          dateList.push(convertDate(event.created_at.date));
        }
      });
      return datePairs;
    },
    filterBySourceOptions: function () {
      if (this.loggedInUser && this.loggedInUser.driver) {
        return {'': '(any)', '_local': 'via Lintol', '_remote': this.loggedInUser.driver.toUpperCase()};
      }
      return {'': '(any)'};
    },
    filterByTypeOptions: function () {
      return {'': '(any)', 'geojson': 'GeoJSON', 'csv': 'CSV'};
    },
    noResourcesSelected: function () {
      return this.selectedResources.length === 0;
    }

  },
  mounted: function () {
    this.$store.dispatch(LOAD_DATA_RESOURCES, { reset: true, page: 1 });
    this.$store.dispatch(LOAD_PROFILES);
    this.$store.dispatch(LOAD_LOGGED_IN_USER);
  },
  watch: {
    ascDesc: function (ascDesc) {
      this.$store.dispatch(UPDATE_DATA_RESOURCES_ORDER, ascDesc);
    },
    sortBy: function (sortBy) {
      this.$store.dispatch(UPDATE_DATA_RESOURCES_SORT, sortBy);
    },
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

<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import './table.scss';

.noResourcesCentered {
  text-align: center;
}

.blackDropDown {
  background-color: #333333;
  color: white;
  border: none;
  outline: none;
  font-size: 10px;
}

.arrowDown:after {
  content: '\2193';
  font-size: 12px;
  font-weight: $bold;
}

.arrowUp:after {
  content: '\2191';
  font-size: 12px;
  font-weight: $bold;
}

.actionContainer {
  display: flex;
  flex-direction: row;
  color: white;
  float: right;
  border-radius: 4px;
  background-color: #333333;
  font-size: 0.625em;
  width: 213px;
}

.actionDropDown {
}

.headerContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  > label {
    font-weight: $bold;
    font-size: 0.75em;
  }
}

.greySeparator {
  border-bottom: 1px solid #EAE5E5;
  margin: 15px 10px 25px 10px;
}

.filterContainer {
  padding-top: 5px;
  padding-bottom: 20px;
}

.rightSeparator {
   border-right: 1px solid white;
   margin: 10px;
   padding: 0px 10px;
}

.searchBox {
  @media (min-width: 1000px) and (max-width: 1024px) {
    width: 125px;
  }
  max-height: 28px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  font-size: 13px;
  padding-bottom: 3px;
  border-radius: 4px;
  background: url(../../assets/images/search.svg) no-repeat scroll 13px 13px;
  background-color: white;
  background-position: 95% 50%;
  background-repeat: no-repeat;
  border-color: #dedede;
  &::placeholder {
    color: #9B9B9B;
  }
}

.numberOfSelected {
  width: 83px;
}


.modalTitle {
  font-weight: $bold;
}

.buttonFooter {
  box-pack:start;
  display: block;
}

.runProfileButton {
  background-color: $buttonColour;
  border: none;
  font-size: 0.75em;
  padding: 13px;
  border-radius: 5px;
  color: $buttonText;
  box-shadow: 0px 0px 5px black;
  display: inline-block;
  font-weight: $bold;
  &:active {
    box-shadow: 0px 0px 0px black;
  }
  &:focus {
    outline:0;
    border: none;
  }
}
.custom-select{
  min-width: 90%;
  margin-bottom: 3px;
}

.instructions {
  margin-bottom: 0px;
}
</style>
