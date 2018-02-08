<template>
  <div id="add-profile-panel">
    <label class="pageTitle">{{ title }}</label>
    <p class="instructions">Enter information below to add a Data Profile</p>
    <div class="formContainer">
      <input id="profileName" :class="[ errors.has('name') ? 'warningBorder' : 'inputNameBorder' ]"  class="formItem inputName" style="border: 10px solid border" placeholder="Name" type="text" v-model=profile.name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" />
      <p v-show="errors.has('name')" class="warningText" >{{ errors.first('name') }}</p>
      <textarea id="profileDescription" class="formItem inputDescription" rows="4" placeholder="Description" v-model=profile.description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: errors.has('description') }" />
      <p v-show="errors.has('description')" class="warningText" >{{ errors.first('description') }}</p>
      <div>
        <p class="processorInstruction">Choose your Processor</p>
        <p class="instructions">From the drop down list choose the processors for this Data Profile</p>
        <v-select :clearSearchOnSelect="false" placeholder="Search for a Processor" :options="processorList" :onChange=processorSelected></v-select>
        <div class="processorContainer">
          <processor-configuration
             :key="configuration.id"
             :configuration="configuration"
             v-for="configuration in chosenProcessors" />
        </div>
      </div>
      <div class="button">
        <button id="addProfile" class="saveButton" @click=addProfile>Add Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessorConfiguration from './ProcessorConfiguration';
import VSelect from 'vue-select';
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
      console.log('test');
      this.$validator.validateAll();
      this.$validator.validateAll().then((result) => {
        console.log(result);
        console.log('testa');
        console.log(this.profile.name);
        this.profile.configurations = this.chosenProcessors;
        console.log('Add Data Profile');
        this.$store.dispatch(STORE_PROFILE, this.profile).then(() => {
          this.$router.push({name: 'profileTable'});
        });
      }).catch((error) => {
        console.log(this.profile);
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
        userConfigurationStorage: {},
        processor: this.processors[option.value]
      });
    }
  },
  components: {
    ProcessorConfiguration: ProcessorConfiguration,
    VSelect: VSelect
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
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_PROCESSORS);
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
  flex-wrap: wrap;
  width: 50%;
}

.processorContainer {
  display: flex;
  flex-direction: column;
}

.inputName {
  min-height: 40px;
}

.inputNameBorder {
  border: 1px grey solid;
}

.inputDescription {
  margin-top: 20px;
  padding-top: 10px;
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
  font-weight: bold;

}
</style>
