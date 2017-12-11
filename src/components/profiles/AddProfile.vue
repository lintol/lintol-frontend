<template>
  <div id="add-profile-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model=name data-vv-name="name" data-vv-as="Profile Name" v-validate="'required'" :class="{ warningBorder: errors.has('name') }"/>
      <p v-show="errors.has('name')" class="warningText" >{{ errors.first('name') }}</p>
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model=description data-vv-name="description" data-vv-as="Profile Description" v-validate="'required'" :class="{ warningBorder: errors.has('description') }" />
      <p v-show="errors.has('description')" class="warningText" >{{ errors.first('description') }}</p>
      <div>
      <p>Choose your Processor<p>
      <p>Instructions<p>
      <v-select :clearSearchOnSelect="false" placeholder="Add Processor"  :options='processorList' :onChange=processorSelected></v-select>
      <div class="processorContainer">
      <processor :key="processor.name" :name="processor.name" :description="processor.description" v-for="processor in choosenProcessors"/>
      </div>
      </div>
      <div>
        <button id="addProfile" class="saveButton" @click=addProfile>Add Profile</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import Processor from './Processor';
import VSelect from 'vue-select';
import { LOAD_PROCESSORS, STORE_PROFILE } from '@/state/action-types';

export default {
  name: 'Name',
  props: {
  },
  data () {
    return {
      title: 'Add Profiles',
      name: '',
      description: '',
      script: '',
      availableProcessors: [],
      choosenProcessors: [],
      selected: null,
      selectedProcessors: []
    };
  },
  methods: {
    addProfile: function () {
      this.$validator.validateAll().then(() => {
        var profile = {};
        profile.name = this.name;
        profile.description = this.description;
        // profile.script = this.script;
        profile.creator = 'Martin';
        profile.version = 7;
        profile.uniqueTag = 'uniq-66-' + this.name;
        // profile.processors = this.choosenProcessors;
        this.$store.dispatch(STORE_PROFILE, profile).then(function () {
          this.$router.push({name: 'processorTable'});
        });
      }).catch((error) => {
        console.log('Validation error:' + error);
      });
    },
    updateProcessors: function (type, action) {
      if (action === 'add') {
        this.choosenProcessors.push(type);
      } else {
        var index = this.choosenProcessors.indexOf(type);
        if (index !== -1) {
          this.choosenProcessors.splice(index, 1);
        }
      }
    },
    processorSelected: function (option) {
      this.choosenProcessors.push(option.value);
    }
  },
  components: {
    Processor: Processor,
    VSelect: VSelect
  },
  watch: {
  },
  computed: {
    processorList: function () {
      return this.$store.state.processors.map((element) => {
        var option = { 'label': element.name, 'value': element };
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
 
.formItem {
  margin-bottom: 10px;
}
</style>
