<template>
  <div id="editProfilePanel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model="name"/>
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model="description" />
      <textarea id="profileScript" class="scriptText formItem" rows="4" cols="50" placeholder="Custom Script" />
      <div>
        <button id="saveProfileChanges" class="addProfileButton" @click=saveChanges>Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditProfile',
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      title: 'Edit Profile',
      name: '',
      description: '',
      script: ''
    };
  },
  methods: {
    saveChanges: function () {
      var url = this.$apiPrefix + '/profiles/' + this.profileId;
      var profile = {};
      profile.name = this.name;
      profile.description = this.description;
      axios.put(url, profile).then((response) => {
        this.$router.push({name: 'profileTable'});
        console.log(response);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
      this.$router.push({name: 'profileTable'});
    },
    getProfile: function () {
      axios.get(this.$apiPrefix + '/profiles/' + this.profileId).then(response => {
        var profile = response.data;
        this.name = profile.name;
        this.description = profile.description;
        console.log(response.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
    this.getProfile();
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
