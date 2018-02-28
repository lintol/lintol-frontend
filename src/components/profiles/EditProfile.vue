<template>
  <div id="edit-profile-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer" v-if="profile">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model=profile.name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" :class="{ warningBorder: vErrors.has('name') }"/>
      <p v-show="vErrors.has('name')" class="warningText" >{{ vErrors.first('name') }}</p>
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model=profile.description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: vErrors.has('description') }" />
      <p v-show="vErrors.has('description')" class="warningText" >{{ vErrors.first('description') }}</p>
      <div>
        <p>Instructions<p>
        <v-select :clearSearchOnSelect="false" placeholder="Add Processor"  :options="processorList" :onChange=processorSelected></v-select>
        <div class="processorContainer">
          <processor-configuration
             :key="configuration.id"
             v-model="configuration.userConfigurationStorage"
             :configuration="configuration"
             v-for="configuration in configurations"
             v-on:removeProcessor="removeSelectedProcessor" />
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
import { LOAD_PROCESSORS, LOAD_PROFILE, SAVE_PROFILE } from '@/state/action-types';

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
      configurations: []
    };
  },
  methods: {
    saveProfile: function () {
      this.$validator.validateAll().then(() => {
        this.$store.dispatch(SAVE_PROFILE, { profile: this.profile, configurations: this.configurations }).then(() => {
          this.$router.push({name: 'profileTable'});
        });
      }).catch((error) => {
        console.log('Validation error:' + error);
      });
    },
    updateProcessors: function (type, action) {
      if (action === 'add') {
        this.configurations.push(type);
      } else {
        var index = this.configurations.indexOf(type);
        if (index !== -1) {
          this.configurations.splice(index, 1);
        }
      }
    },
    processorSelected: function (option) {
      this.configurations.push({
        userConfigurationStorage: {},
        processor: this.processors[option.value]
      });
    },
    removeSelectedProcessor: function (name) {
      this.configurations = this.configurations.filter((element) => {
        return element.processor.name !== name;
      });
    }
  },
  components: {
    ProcessorConfiguration: ProcessorConfiguration,
    VSelect: VSelect
  },
  watch: {
    profile: function (profile) {
      this.configurations = profile.configurations;
    }
  },
  computed: {
    profile: function () {
      return this.$store.state.currentProfile;
    },
    processors: function () {
      return this.$store.getters.processors.reduce((map, element) => {
        map[element.id] = element;
        return map;
      }, {});
    },
    processorList: function () {
      return this.$store.getters.processors.map((element) => {
        var option = { 'label': element.name, 'value': element.id };
        return option;
      });
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROFILE, this.profileId);
    this.$store.dispatch(LOAD_PROCESSORS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

.instructions {
}

.scriptText {
  border: black dashed 3px;
  overflow: auto;
}

.formContainer {
  display: flex;
  flex-direction: column;
  width: 50%;
}
 
.formItem {
  margin-bottom: 10px;
}
</style>
