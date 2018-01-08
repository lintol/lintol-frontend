<template>
  <div id="edit-profile-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model=profile.name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" :class="{ warningBorder: errors.has('name') }"/>
      <p v-show="errors.has('name')" class="warningText" >{{ errors.first('name') }}</p>
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model=profile.description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: errors.has('description') }" />
      <p v-show="errors.has('description')" class="warningText" >{{ errors.first('description') }}</p>
      <div>
        <p>Instructions<p>
        <v-select :clearSearchOnSelect="false" placeholder="Add Processor"  :options="processorList" :onChange=processorSelected></v-select>
        <div class="processorContainer">
          <processor-configuration
             :key="configuration.id"
             :configuration="configuration"
             v-for="configuration in chosenProcessors" />
        </div>
      </div>
      <div>
        <button id="saveProfile" class="saveButton" @click=saveProfile>Update Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessorConfiguration from './ProcessorConfiguration';
import VSelect from 'vue-select';
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
      profile: {
        name: '',
        description: '',
        creator: 'Martin',
        version: 7,
        uniqueTag: 'uniq-66-' + this.name
      },
      chosenProcessors: []
    };
  },
  methods: {
    saveProfile: function () {
      this.$validator.validateAll().then(() => {
        this.$store.dispatch(SAVE_PROFILE, this.profile).then(() => {
          this.$router.push({name: 'profileTable'});
        });
      }).catch((error) => {
        console.log('Validation error:' + error);
      });
    },
    updateProcessors: function (type, action) {
      if (action === 'add') {
        this.chosenProcessors.push(type);
      } else {
        var index = this.chosenProcessors.indexOf(type);
        if (index !== -1) {
          this.chosenProcessors.splice(index, 1);
        }
      }
    },
    processorSelected: function (option) {
      this.chosenProcessors.push({
        attributes: {
          userConfigurationStorage: {},
          processor: this.processors[option.value]
        }
      });
    }
  },
  components: {
    ProcessorConfiguration: ProcessorConfiguration,
    VSelect: VSelect
  },
  computed: {
    currentProfile: function () {
      this.profile = this.$store.state.currentProfile;
      console.log(this.profile);
      return this.$store.state.currentProfile;
    },
    processors: function () {
      return this.$store.state.processors.reduce((map, element) => {
        map[element.id] = element;
        return map;
      }, {});
    },
    processorList: function () {
      return this.$store.state.processors.map((element) => {
        var option = { 'label': element.attributes.name, 'value': element.id };
        return option;
      });
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
