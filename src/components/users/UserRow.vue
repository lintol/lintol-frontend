<template>
  <div id="users-row" class="shadedRow">
    <div class="userRow">
      <div class="selectedResource">
         <label class="checkbox-container">
           <input type="checkbox" :id="'active' + index" @click="userSelected" :checked=isResourceSelected />
           <span :for="'active' + index" class="checkmark"></span>
         </label>
      </div>
      <div class="userMainColumn center">
        <div class="rightSeparator">
          <label class="name">{{ user.name }}</label>
        </div>
      </div>
      <div class="userColumn center">
          <label class="email">{{ user.email }}</label>
      </div>
      <!--<div class="userColumn center">
        <label class="user-present" v-if="user.present">has logged on here</label>
        <label class="user-not-present" v-else>has not logged on here</label>
      </div>
      <div class="userColumn center">
        <label class="driver">From</label>
        <label v-if="user.driver">{{ user.driver }}<span v-if="user.driverServer"> : {{ user.driverServer }}</span></label>
        <label v-else>(local)</label>
      </div>-->
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'UserRow',
  props: {
    index: {
      type: Number,
      required: true
    },
    user: {
      type: Object,
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
    userSelected: function () {
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
@import '~@/assets/scss/checkbox.scss';

.rightSeparator {
  margin-right: 10px;
}

/* Because bootstrap has all labels margin-bottom: 0.5rem */
label {
  margin-bottom: 0px;
}

.userColumn {
  min-width:100px;
  flex: 1;
} 

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.userMainColumn {
  flex: 2;
}

.userRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 450px;
  height: 40px;
}
 
.columnTitle {
  font-weight: bold;
}

.verticalAlign {
  vertical-align: middle;
}

div .userColumn p {
  margin: unset;
  color: grey;
}

.userPicture {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.selectedResource {
  padding-top: 13px;
  padding-left: 10px;
} 

.name {
  color: #333333;
  font-size: 0.75em;	
  font-weight: $bold; 
}

.email {
  color: #918484;	
  font-size: 0.75em;
}
</style>
