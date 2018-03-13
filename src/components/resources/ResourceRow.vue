<template>
  <div id="resources-row" class="shadedRow">
    <div class="resourceRow">
      <div class="selectedResource center">
         <label class="checkbox-container">
           <input type="checkbox" :id="'active' + index" @click="resourceSelected" :checked=isResourceSelected />
           <span :for="'active' + index" class="checkmark"></span>
         </label>
      </div>
      <div class="filename center">
        <div class="rightSeparator ">
          <label id="resourceName" class="filenameLabel"> {{ resource.filename }} </label>
        </div>
      </div>
      <div class="wrapper type-source-dataAdded">
        <div class="center fileType ">
          <label>{{ resource.filetype }}</label>
        </div>
        <div class="center source">
          <label>{{ resource.source }}</label>
        </div>
        <div class="center dateAdded">
          <label>{{ convertDate(resource.created_at) }}</label>
        </div>
      </div>
      <div class="wrapper owner-status-action">
        <div class="center owner">
          <user :user="resource.user"></user>
        </div>
        <div class="center status">
          <label id="resourceStatus" class="statusLabel" :class="statusColor" >{{ resource.status }}</label>
        </div>
        <div class="center actionButton">
          <button class="viewResourceButton" @click="viewResource">View Resource</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
import userComponent from '@/components/users/UserComponent.vue';

export default {
  name: 'ResourceRow',
  props: {
    resource: {
      type: Object,
      required: true
    },
    index: {
      type: String,
      required: true
    },
    clearSelected: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isResourceSelected: false
    };
  },
  methods: {
    convertDate: convertDate,
    viewResource: function (e) {
      window.open(this.resource.url, '_blank');
    },
    resourceSelected: function (e) {
      this.isResourceSelected = !this.isResourceSelected;
      this.$emit('resourceSelected', this.resource, this.isResourceSelected);
    }
  },
  watch: {
    clearSelected: function () {
      if (this.clearSelected) {
        this.isResourceSelected = false;
      }
    }
  },
  components: {
    user: userComponent
  },
  computed: {
    statusColor: function () {
      var result;
      switch (this.resource.status) {
        case 'new resource':
          result = 'newStatus';
          break;
        case 'report run':
          result = 'runStatus';
          break;
        case 'archived':
          result = 'archivedStatus';
          break;
        case 'valid link':
          result = 'validLinkStatus';
          break;
        case 'invalid link':
          result = 'invalidLinkStatus';
          break;
        default:
          result = 'invalidStatus';
          break;
      }
      return result;
    }
  },
  mounted: function () {
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/checkbox.scss';
@import './table.scss';

label {
  margin-bottom: 0px;
}

.newStatus {
  background-color: blue;
}

.invalidStatus {
  background-color: purple;
}

.runStatus {
  background-color: #7BA74D;
}

.archivedStatus {
  background-color: #777776;
}

.validLinkStatus {
  background-color: #DBD25A;
}

.invalidLinkStatus {
  background-color: #FF4E50;
}

.checkbox-container {
   margin-top: 5px;
   margin-bottom: 5px;
}

.statusLabel {
  color: white;
  border-radius: 40px;
  width: 10em;
  padding: 5px;
  font-size: 0.625em;
  text-transform: capitalize;
  font-weight: $bold;
  text-align: center;
}
 
.center {
  display: flex;
  flex-direction: column;
}

.resourceAction {
  min-width: 120px;
  display: inline-block;
}

.resourceRow {
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 40px;
  margin-left: 10px;
}
 
.verticalAlign {
  vertical-align: middle;
}

.viewResourceButton {
  background: white;
  color: $orange;
  border: 2px solid $orange;
  border-radius: 5px;
  font-size: 0.75em;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    box-shadow: 0px 0px 10px black;
  }
}

.filenameLabel {
  font-size: 0.75em;
  font-weight: bold;
  color: #333333;
  word-wrap: break-word;
}

.wrapper {
  display: flex;
  flex-direction: row;
}

</style>
