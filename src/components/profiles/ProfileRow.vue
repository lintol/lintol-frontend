<template>
  <div id="profiles-row">
    <div class="profileRow">
    <label class="profileColumn" >{{ profile.name }}</label>
    <label class="profileColumn" >{{ profile.creator }}</label>
    <label class="profileColumn" >{{ convertDate(profile.created_at) }}</label>
    <label class="profileColumn" >{{ convertDate(profile.updated_at) }}</label>
    <label class="profileColumn" >{{ profile.version }}</label>
    <label class="profileColumn" >{{ profile.uniqueTag }}</label>
    <select class="profileActions" id="profileAction" @click=profileAction>
      <option value=""></option> 
      <option value="edit">Edit</option> 
      <option value="archive">Archive</option> 
    </select>
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
        this.$router.push({name: 'editProfile', params: { id: this.profile.id }});
      }
      if (e.target.value === 'archive') {
        console.log('archiving');
      }
    },
    convertDate: function (dateString) {
      return moment(dateString).format('YYYY-MM-DD');
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
<style scoped>
@import '../../assets/scss/application.scss';

.profileColumn {
  min-width: 120px;
  display: inline-block;
}

.profileAction {
  min-width: 120px;
  display: inline-block;
}
.profileRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

</style>
