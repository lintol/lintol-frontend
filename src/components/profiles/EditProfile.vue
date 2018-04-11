<template>
  <div id="edit-profile-panel">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">Edit your profile below</p>
    <div class="formContainer" v-if="profile">
      <input id="profileName" :class="[ vErrors.has('name') ? 'warningBorder' : 'inputNameBorder' ]"  class="formItem inputName" style="border: 10px solid border" placeholder="Name" type="text" v-model=profile.name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" />
      <p v-show="vErrors.has('name')" class="warningText" >{{ vErrors.first('name') }}</p>
      <textarea id="profileDescription" maxlength="200" class="formItem inputDescription" rows="4" placeholder="Description" v-model=profile.description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: vErrors.has('description') }" />
      <label class="descriptionLength" :class='{ warningText: descriptionLength == 200 }'>Length: {{ descriptionLength }}</label>
      <p v-show="vErrors.has('description')" class="warningText" >{{ vErrors.first('description') }}</p>
      <div>
        <p class="subHeading">Choose your Processor</p>
        <p class="instructions">From the drop down list choose the processors for this Data Profile</p>
        <v-select :clearSearchOnSelect="false" placeholder="Search for a Processor"  :options="processorList" :onChange=processorSelected></v-select>
        <div class="processorContainer">
          <processor-configuration
             :key="configuration.id"
             v-model="configuration.userConfigurationStorage"
             :configuration="configuration"
             v-for="configuration in configurations"
             v-on:removeProcessor="removeSelectedProcessor" />
        </div>
      </div>
      <div class="button">
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
      configurations: [],
      descriptionMaxLength: 5
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
    },
    descriptionLength: function () {
      return this.profile.description.length;
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

.processorContainer {
   display: flex;
   flex-direction: column;
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

.processorContainer {
  display: flex;
  flex-direction: column;
}

.inputName {
  max-height: 40px;
  font-size: 0.75em;
  padding: 10px 0px;
}

.inputNameBorder {
  border: 1px grey solid;
}

.inputDescription {
  margin-top: 20px;
  padding-top: 10px;
  font-size: 0.75em;
}
 
.formItem {
  margin-bottom: 10px;
  padding-left: 10px;
}

.button {
  margin-top: 36px;
}

.processorInstruction {
  font-size: 14px;
  font-weight: $bold;
}

.descriptionLength {
  font-size: 12px;
}
</style>
