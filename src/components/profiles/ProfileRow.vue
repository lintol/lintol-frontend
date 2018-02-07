<template>
  <div id="profiles-row" class="shadedRow">
    <div class="profileRow">
      <div class="profileColumn profileMainColumn center">
        <div class="rightSeparator ">
          <label class="profileName"> {{ profile.name }} </label>
          <label class="user"> <img class="profilePicture" src="../../assets/images/profile.png"> </img>{{ profile.creator }} </label>
          <p style=" word-wrap: break-word;" >{{ profile.description }} </p>
        </div>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Created</label>
        <p>{{ convertDate(profile.created_at) }}</p>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Last Updated</label>
        <p>{{ convertDate(profile.updated_at) }}</p>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Last Updated</label>
        <p >{{ profile.version }}</p>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Unique Tag</label>
        <p>{{ profile.uniqueTag }}</p>
      </div>
      <div class="profileColumn verticalCenterItems">
        <select class="profileActions verticalAlign viewAction" id="profileAction" @click=profileAction>
          <option value="">Edit/Archive</option> 
          <option value="edit">Edit</option> 
          <option value="archive">Archive</option> 
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'ProfileRow',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      msg: 'Data Profiles'
    };
  },
  methods: {
    convertDate: convertDate,
    profileAction: function (e) {
      console.log('profile action:');
      if (e.target.value === 'edit') {
        this.$router.push({name: 'editProfile', params: { profileId: this.profile.id }});
      }
      if (e.target.value === 'archive') {
        console.log('archiving');
      }
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

<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.profileColumn {
  min-width: 150px;
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

.profileMainColumn {
  flex: 2;
  min-height: 80px;
  padding: 10px;
}

.profileAction {
  min-width: 120px;
  display: inline-block;
}
.profileRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
 
.verticalAlign {
  vertical-align: middle;
}

div .profileColumn p {
  margin-top: 4px;
  color: grey;
  font-size: 11px;
}

.viewAction {
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

.profileName {
  font-size: 15px;
  width: 150px;
}

.user {
  font-size: 12px;
  color: #777776;
}
</style>
