<template>
  <div id="resources-row" class="shadedRow">
    <div class="resourceRow">
      <div class="resourceColumn center">
         <div>
         <div class="blackCheckbox">
           <input type="checkbox" value="1" id="active" name="active" checked="checked"/>
           <label for=active></label>
         </div>
         </div>
      </div>
      <div class="resourceColumn resourceMainColumn center">
        <div class="rightSeparator ">
          <label class="resourceName"> {{ resource.filename }} </label>
        </div>
      </div>
      <div class="resourceColumn center">
        <p class="fileType">{{ resource.filetype }}</p>
      </div>
      <div class="resourceColumn center">
        <p class="stored">{{ resource.stored }}</p>
      </div>
      <div class="resourceColumn center">
        <p>{{ convertDate(resource.created_at) }}</p>
      </div>
      <div class="resourceColumn center">
        <p>{{ resource.owner }}</p>
        <img class="profilePicture" src="../../assets/images/profile.png"></img>
      </div>
      <div class="center">
        <p class="status">{{ resource.status }}</p>
      </div>
      <div class="resourceColumn verticalCenterItems">
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
    }
  },
  data () {
    return {
    };
  },
  methods: {
    convertDate: convertDate,
    viewResource: function (e) {
      console.log('Redirecting to: ' + this.resource.url);
      // `this.$router.push(this.resource.url);
      location.href = 'http://' + this.resource.url;
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
    console.log(this.resource);
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.fileType {
  text-transform: uppercase;
}

.stored {
  text-transform: uppercase;
}

.status {
  border: 1px black solid;
  border-radius: 40px;
  background-color: #333333;
  padding: 20px;
  color: #FFFFFF;
  font-size: 10px;
}

.resourceColumn {
  min-width: 150px;
  border: 1px solid black;
  flex: 1;
  > label {
    font-weight: bold;
    font-size: 10px;
  }
}
 
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.resourceMainColumn {
  flex: 2;
  min-height: 80px;
  padding: 10px;
}

.resourceAction {
  min-width: 120px;
  display: inline-block;
}
.resourceRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
 
.verticalAlign {
  vertical-align: middle;
}

div .resourceColumn p {
  margin-top: 4px;
  color: grey;
  font-size: 11px;
}

.viewResourceButton {
  background: white;
  color: $orange;
  border: 2px solid $orange;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    box-shadow: 0px 0px 10px black;
  }
}

.resourceName {
  font-size: 12px;
  width: 150px;
  font-weight: bold;
  color: #333333;
}

.user {
  font-size: 12px;
  color: #777776;
}
</style>
