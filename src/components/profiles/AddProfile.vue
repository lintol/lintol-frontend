<template>
  <b-container id="add-profile-panel">
      <b-row>
        <b-col cols='12' sm='12' >
          <label class="pageTitle">{{ title }}</label>
        </b-col>
        <b-col cols='12' sm='12' >
            <p class="instructions">Enter information below to add a Data Profile</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <div class="formItem">
            <b-form-input id="profileName" maxlength="30" :class="[ vErrors.has('name') ? 'warningBorder' : 'inputNameBorder' ]"  class="inputName" style="border: 10px solid border" placeholder="Name" type="text" v-model=profile.name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" />
            <p v-show="vErrors.has('name')" class="warningText" >{{ vErrors.first('name') }}</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <div class="formItem">
            <b-form-textarea id="profileDescription" maxlength="200" class="inputDescription" rows="4" placeholder="Description" v-model=profile.description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: vErrors.has('description') }" />
            <p v-show="vErrors.has('description')" class="warningText" >{{ vErrors.first('description') }}</p>
          </div>
        </b-col>
      </b-row>
      <label class="descriptionLength" :class='{ warningText: descriptionLength == 200 }'>Length: {{ descriptionLength }}</label>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <p class="subHeading">Choose your Processor</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <p class="instructions">From the drop down list choose the processors for this Data Profile</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <v-select class="mb-3" :clearable="false" placeholder="Search for a Processor" :options="processorList" :onChange=processorSelected></v-select>
          <div class="processorContainer">
            <processor-configuration
               :key="configuration.id"
               v-model="configuration.userConfigurationStorage"
               :configuration="configuration"
               v-for="configuration in chosenProcessors"
               v-on:removeProcessor="removeSelectedProcessor" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' sm='12' md='6'>
          <b-button id="addProfile" class="saveButton" @click=addProfile>Add Profile</b-button>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import ProcessorConfiguration from './ProcessorConfiguration';
import { LOAD_PROCESSORS, STORE_PROFILE } from '@/state/action-types';

export default {
  name: 'AddProfile',
  props: {
  },
  data () {
    return {
      title: 'Add Data Profile',
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
    addProfile: function () {
      this.$validator.validateAll().then((result) => {
        this.$store.dispatch(STORE_PROFILE, {
          profile: this.profile,
          configurations: this.chosenProcessors
        }).then((val) => {
          this.$router.push({name: 'profileTable'});
        });
      }).catch((error) => {
        console.log('Validation error:' + error);
      });
    },
    processorSelected: function (option) {
      this.chosenProcessors.push({
        userConfigurationStorage: this.processors[option.value].configurationDefaults,
        processor: this.processors[option.value]
      });
    },
    removeSelectedProcessor: function (name) {
      this.chosenProcessors = this.chosenProcessors.filter((element) => {
        return element.processor.name !== name;
      });
    }
  },
  components: {
    ProcessorConfiguration: ProcessorConfiguration
  },
  watch: {
  },
  computed: {
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
    this.$store.dispatch(LOAD_PROCESSORS);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';
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
  padding: 10px 15px;
}

.inputNameBorder {
  border: 1px grey solid;
}

.inputDescription {
  font-size: 0.75em;
}
.formItem {
  margin-bottom: 10px;
  > p {
    margin-bottom: 0px;
  }
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

.saveButton{
  margin-top: 36px;
}

.warningText {
  font-size: 0.75em;
}

</style>
