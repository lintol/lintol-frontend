<template>
  <div id="profiles-row" class="shadedRow">
    <div class="profileRow">
      <div class="profileColumn profileMainColumn center">
        <div class="rightSeparator ">
          <label class="profileName"> {{ profile.name }} </label>
          <user v-if="profile.creator" class="user" :user="profile.creator"></user>
          <p style=" word-wrap: break-word;" >{{ profile.description }} </p>
        </div>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Created</label>
        <p>{{ convertDate(profile.created_at.date) }}</p>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Last Updated</label>
        <p>{{ convertDate(profile.updated_at.date) }}</p>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Version</label>
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
import userComponent from '@/components/users/UserComponent.vue';

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
    user: userComponent
  },
  computed: {
  },
  mounted: function () {
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

/* Because bootstrap has all labels margin-bottom: 0.5rem */
label {
  margin-bottom: 0px;
}

.profileColumn {
  flex: 1;
  > label {
    font-weight: bold;
    font-size: 0.625em;
  }
}
 
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profileMainColumn {
  flex: 2;
  padding: 0.625em;
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
  font-size: 0.6875em;
}

.viewAction {
  background: white;
  color: $orange;
  border: 2px solid $orange;
  border-radius: 5px;
  padding: 10px;
  font-size: 0.75em;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    box-shadow: 0px 0px 10px black;
  }
}

.profileName {
  font-size: 0.75em;
  width: 150px;
}

.user {
  font-size: 0.75em;
  color: $grey;
}
</style>
