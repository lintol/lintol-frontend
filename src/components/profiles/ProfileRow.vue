<template>
  <div id="profiles-row" class="profileRow">
    <label class="profileColumn" >{{ profile.name }}</label>
    <label class="profileColumn" >{{ profile.creator }}</label>
    <label class="profileColumn" >{{ profile.created }}</label>
    <label class="profileColumn" >{{ profile.lastUpdated }}</label>
    <label class="profileColumn" >{{ profile.versionHistory }}</label>
    <label class="profileColumn" >{{ profile.comments }}</label>
    <label class="profileColumn" >{{ profile.unqiueTag }}</label>
  </div>
</template>

<script>
// import axios from 'axios';
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
  },
  components: {
  },
  computed: {
  },
  mounted: {
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

.profileRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

</style>
