<template>
  <div id="add-profile-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" />
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" />
      <textarea id="profileScript" class="scriptText formItem" rows="4" cols="50" placeholder="Custom Script" />
      <div>
        <button class="addProfileButton" @click=addProfile>Add Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Name',
  props: {
  },
  data () {
    return {
      title: 'Add Profiles',
      name: '',
      description: '',
      script: ''
    };
  },
  methods: {
    addProfile: function () {
      /* var url = this.$apiPrefix + '/profiles/';
      var profile = {};
      profile.name = this.name;
      profile.description = this.description;
      profile.script = this.script;
      axios.put(url, profile).then((response) => {
        this.$router.push({name: 'profiles'});
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      }); */
      this.$emit('addedProfile');
    }
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
<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.instructions {
}

.scriptText {
  border: black dashed 3px;
  overflow: auto;
}

.formContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 50%;
}
 
.formItem {
  margin-bottom: 10px;
}
</style>
