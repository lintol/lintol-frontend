<template>
  <div id="editProfilePanel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model="profile.name"/>
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model="profile.description" />
      <textarea id="profileScript" class="scriptText formItem" rows="4" cols="50" placeholder="Custom Script" />
      <div>
        <button id="saveProfileChanges" class="addProfileButton" @click=saveChanges>Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_PROFILE, SAVE_PROFILE } from '@/state/action-types';

export default {
  name: 'EditProfile',
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: 'Edit Profile',
      script: ''
    };
  },
  methods: {
    saveChanges: function () {
      if (this.profile) {
        this.$store.dispatch(SAVE_PROFILE, this.profile).then(() => {
          this.$router.push({name: 'profileTable'});
        });
      }
    }
  },
  components: {
  },
  computed: {
    profile: function () {
      return this.$store.state.currentProfile;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROFILE, this.profileId);
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
