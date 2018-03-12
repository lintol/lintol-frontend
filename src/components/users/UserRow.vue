<template>
  <div id="users-row" class="shadedRow">
    <div class="userRow">
      <div class="userMainColumn center">
        <div class="rightSeparator">
          <label class="columnHeader">{{ user.email }}</label>
        </div>
      </div>
      <div class="userColumn center">
          <p>{{ user.name }}</p>
      </div>
      <div class="userColumn center">
        <label class="user-present" v-if="user.present">has logged on here</label>
        <label class="user-not-present" v-else>has not logged on here</label>
      </div>
      <div class="userColumn center">
        <label class="driver">From</label>
        <label v-if="user.driver">{{ user.driver }}<span v-if="user.driverServer"> : {{ user.driverServer }}</span></label>
        <label v-else>(local)</label>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'UserRow',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {
    convertDate: convertDate
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
@import '../../assets/scss/application.scss';

.userColumn {
  min-width: 150px;
  flex: 1;
} 

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.userMainColumn {
  flex: 2;
  padding: 10px;
}

.userAction {
  min-width: 120px;
  display: inline-block;
}
.userRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  min-height: 100px;
  padding: 0px 10px;
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

.ragDisplay{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center; 
}

.columnHeader {
  font-weight: bold;
}

.ranOn {
  font-weight: bold;
  font-size: 10px;
  margin-left: 20px;
  + label {
    font-size: 11px;
    margin-left: 20px;
  }
}

.ragNumber {
  vertical-align: top;
  font-size: 12px;
}

</style>
