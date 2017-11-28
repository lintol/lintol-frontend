<template>
  <div id="profiles-row" class="shadedRow">
    <div class="profileRow">
      <div class="profileColumn profileMainColumn center">
        <div class="rightSeparator ">
          <label> <b>{{ profile.name }}</b> by <img class="profilePicture" src="../../assets/images/profile.png"> </img>{{ profile.creator }} </label>
          <p>{{ profile.description }} </p>
        </div>
      </div>
      <div class="profileColumn center">
        <label class="columnTitle">Created at</label>
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
        <label class="columnTitle">Last Updated</label>
        <p>{{ profile.uniqueTag }}</p>
      </div>
      <div class="profileColumn">
        <select class="profileActions verticalAlign" id="profileAction" @click=profileAction>
          <option value=""></option> 
          <option value="edit">Edit</option> 
          <option value="archive">Archive</option> 
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
    profileAction: function (e) {
      console.log('profile action:');
      if (e.target.value === 'edit') {
        this.$router.push({name: 'editProfile', params: { profileId: this.profile.id }});
      }
      if (e.target.value === 'archive') {
        console.log('archiving');
      }
    },
    convertDate: function (dateString) {
      return moment(dateString).format('Do MMMM YYYY');
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
@import '../../assets/scss/application.scss';

.profileColumn {
  min-width: 150px;
  flex: 1;
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
 
.columnTitle {
  font-weight: bold;
}


.shadedRow {
  border: 1px solid $rowBackground;
  border-radius: 3px;
  background-color: $rowBackground;
  margin: 20px;
}

.verticalAlign {
  vertical-align: middle;
}

div .profileColumn p {
  margin: unset;
  color: grey;
}
</style>
