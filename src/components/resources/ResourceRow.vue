<template>
  <div id="resources-row" class="shadedRow">
    <div class="resourceRow">
      <div class="selectedResource center">
         <div>
           <div class="blackCheckbox">
             <input type="checkbox" :id="'active' + index" @click="resourceSelected" :checked=isResourceSelected />
             <label :for="'active' + index"></label>
           </div>
         </div>
      </div>
      <div class="filename center">
        <div class="rightSeparator ">
          <label id="resourceName" class="filenameLabel"> {{ resource.filename }} </label>
        </div>
      </div>
      <div class="wrapper type-source-dataAdded">
        <div class="center fileType ">
          <p>{{ resource.filetype }}</p>
        </div>
        <div class="center source">
          <p>{{ resource.source }}</p>
        </div>
        <div class="center dateAdded">
          <p>{{ convertDate(resource.created_at) }}</p>
        </div>
      </div>
      <div class="center owner">
        <img class="profilePicture" src="../../assets/images/profile.png"></img>
        <label>{{ resource.owner }}</label>
      </div>
      <div class="center status">
        <label id="resourceStatus" class="statusLabel" :class="statusColor">{{ resource.status }}</label>
      </div>
      <div class="verticalCenterItems actionButton">
          <button class="viewResourceButton" @click="viewResource">View Resource</button>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
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
      console.log('Redirecting to: ' + this.resource.url);
      // `this.$router.push(this.resource.url);
      location.href = 'http://' + this.resource.url;
    },
    resourceSelected: function (e) {
      this.isResourceSelected = !this.isResourceSelected;
      this.$emit('resourceSelected', this.resource, this.isResourceSelected);
    }
  },
  watch: {
    clearSelected: function () {
      console.log('clear:' + this.clearSelected);
      if (this.clearSelected) {
        this.isResourceSelected = false;
      }
    }
  },
  components: {
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
@import './table.scss';

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

.statusLabel {
  color: white;
  border-radius: 40px;
  padding: 5px;
  font-size: 10px;
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
}
 
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 12px;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    box-shadow: 0px 0px 10px black;
  }
}

.filenameLabel {
  font-size: 12px;
  font-weight: bold;
  color: #333333;
}

.user {
  font-size: 12px;
  color: #777776;
}

.wrapper {
  display: flex;
  flex-direction: row;
}

</style>
