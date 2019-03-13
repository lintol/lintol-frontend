<template>
  <b-container>
    <b-row class="shadedRow" no-gutters>
      <b-col cols="3" class="profileMainColumn center">
        <div class="rightSeparator">
          <label class="profileName"> {{ profile.name }} </label>
          <user v-if="profile.creator" class="user" :user="profile.creator"></user>
          <p class="description" >{{ profile.description }} </p>
        </div>
      </b-col>
      <b-col cols="2" class="profileColumn center">
        <div>
        <label class="columnTitle">Created</label>
        <p>{{ convertDate(profile.created_at.date) }}</p>
        </div>
      </b-col>
      <b-col cols="2" class="profileColumn center">
        <div>
        <label class="columnTitle">Last Updated</label>
        <p>{{ convertDate(profile.updated_at.date) }}</p>
        </div>
      </b-col>
      <b-col cols="2" class="profileColumn center">
        <div>
          <label class="columnTitle">Version</label>
          <p>{{ profile.version }}</p>
        </div>
      </b-col>
      <b-col cols="2" class="profileColumn center">
        <div>
        <label class="columnTitle">Unique Tag</label>
        <p>{{ profile.uniqueTag }}</p>
        </div>
      </b-col>
      <b-col cols="1" class="profileColumn verticalCenterItems">
        <!-- <select class="profileActions verticalAlign viewAction" id="profileAction" @click=profileAction>
          <option style='text-align: left' value="">Edit/Archive</option>
          <option value="edit">Edit</option>
          <option value="archive">Archive</option>
        </select> -->
        <b-button class="profileActions verticalAlign viewAction" id="profileAction" @click="profileAction(profile.id)">
          Edit
        </b-button>
      </b-col>
    </b-row>
  </b-container>
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
    };
  },
  methods: {
    convertDate: convertDate,
    profileAction: function (profileId) {
      this.$router.push({name: 'editProfile', params: { profileId: profileId }});
      // if (e.target.value === 'edit') {
      //   console.log(this.$router);
      //   this.$router.push({name: 'editProfile', params: { profileId: '01aa762d-23f7-4cbc-b150-3a41ee4b9551' }});
      // }
      // if (e.target.value === 'archive') {
      //   console.log('archiving');
      // }
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
 > div {
   margin: auto;
  > label {
    font-weight: bold;
    font-size: 0.625em;
  }
 }
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profileMainColumn {
  padding: 0.625em;
  p {
  margin-top: 4px;
  color: grey;
  font-size: 0.6875em;
}
}

.profileAction {
  min-width: 120px;
  display: inline-block;
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
  word-wrap: break-word;
}

.description {
  word-wrap: break-word;
}

.user {
  font-size: 0.75em;
  color: #777776;
}

.rightSeparator{
  padding-right: 5px;
}
</style>
