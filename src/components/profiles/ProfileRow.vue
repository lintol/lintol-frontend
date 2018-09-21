<template>
  <div id="profiles-row" class="">
    <b-row no-gutters  class="profileRow shadedRow fullSize">
      <b-col sm='4' cols='6' class="profileColumn profileMainColumn center first fullSize" v-on:click='openTab'>
        <div class="rightSeparator">
          <label class="profileName"> {{ profile.name }} </label>
          <user v-if="profile.creator" class="user" :user="profile.creator"></user>
          <p class="description" >{{ profile.description }} </p>
        </div>

      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols = '10' offset='1' order='3' class='third bottom-bar show'>

      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='1' cols='6' class="profileColumn center third fullSize">
        <label class="columnTitle">Created</label>
        <p>{{ convertDate(profile.created_at.date) }}</p>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='1' cols='6' class="profileColumn center third fullSize">
        <label class="columnTitle">Last Updated</label>
        <p>{{ convertDate(profile.updated_at.date) }}</p>
      </b-col>
      <b-col sm='1' cols='6' class="profileColumn center second fullSize" v-on:click='openTab'>
        <label class="columnTitle">Version</label>
        <p >{{ profile.version }}</p>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='1' cols='12' class="profileColumn center third fullSize" >
        <label class="columnTitle">Unique Tag</label>
        <p>{{ profile.uniqueTag }}</p>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='12' class="profileColumn verticalCenterItems third ">
        <select class="fullSize profileActions verticalAlign viewAction" id="profileAction" @click=profileAction>
          <option style='text-align: left' value="">Edit/Archive</option>
          <option value="edit">Edit</option>
          <option value="archive">Archive</option>
        </select>
      </b-col>
    </b-row>
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
      msg: 'Data Profiles',
      isOpen: true
    };
  },
  methods: {
    convertDate: convertDate,
    profileAction: function (e) {
      console.log('profile action:');
      if (e.target.value === 'edit') {
        console.log(this.$router);
        this.$router.push({name: 'editProfile', params: { profileId: '01aa762d-23f7-4cbc-b150-3a41ee4b9551' }});
      }
      if (e.target.value === 'archive') {
        console.log('archiving');
      }
    },
    openTab: function () {
      this.isOpen = !this.isOpen;
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
  padding: 0.625em;
}

.profileAction {
  min-width: 120px;
  display: inline-block;
}
.profileRow {
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
  word-wrap: break-word;
}

.description {
  word-wrap: break-word;
}

.user {
  font-size: 0.75em;
  color: #777776;
}

.first{
  order: 0;
}

.second{
  order : 0;
}

.third{
  order: 0;
}

.bottom-bar{
  border-bottom:1px solid #E5E5E5;
  margin-bottom: 15px;
}

.open{
  display: flex;
}
.show{
  display: none;
}
.rightSeparator{
  padding-right: 5px;
}
@media (max-width: 376px){
  .first{
    order: 1;
    padding: 10px 0px;
  }

  .second{
    order : 2;
  }

  .third{
    order: 3;
    padding: 5px 10px 5px 10px;
  }

  .show{
    display: flex;
  }

  .open{
    display: none;
  }
  .fullSize{
    width:100%;
    text-align: center;
    text-align-last: center;
  }
}
</style>
