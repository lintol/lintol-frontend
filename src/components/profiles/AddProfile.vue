<template>
  <div id="add-profile-panel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="profileName" class="formItem" placeholder="Name" type="text" v-model=name />
      <textarea id="profileDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model=description />
      <div>
      <p>Choose your Processor<p>
      <p>Instructions<p>
      <div class="processorContainer">
        <processor :key="processor.title" :title="processor.title" :description="processor.description" :moreInfo="processor.moreInfo" :type="processor.type" v-for="processor in availableProcessors" v-on:processorSelected="updateProcessors" />
      </div>
      </div>
      <div>
        <button id="addProfile" class="addProfileButton" @click=addProfile>Add Profile</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Processor from './Processor';
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
      choosenProcessors: []
    };
  },
  methods: {
    addProfile: function () {
      var url = this.$apiPrefix + '/profiles/';
      var profile = {};
      profile.name = this.name;
      profile.description = this.description;
      // profile.script = this.script;
      profile.creator = 'Martin';
      profile.version = 7;
      profile.uniqueTag = 'uniq-66-' + this.name;
      // profile.processors = this.choosenProcessors;
      axios.post(url, profile).then((response) => {
        this.$router.push({name: 'profiles'});
        console.log(response);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
      this.$router.push({name: 'profileTable'});
    },
    getProcessor: function () {
      var url = this.$apiPrefix + '/processors/';
      axios(url).then((response) => {
        this.availableProcessors = response.data;
        console.log(this.processors);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },
    updateProcessors: function (type, action) {
      if (action === 'add') {
        this.choosenProcessors.push(type);
      } else {
        var index = this.choosenProcessors.indexOf(type);
        console.log(index);
        if (index !== -1) {
          this.choosenProcessors.splice(index, 1);
        }
      }
      console.log(this.choosenProcessors);
    }
  },
  components: {
    Processor: Processor
  },
  computed: {
  },
  mounted: function () {
    // this.getProcessor();
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
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
}

.processorContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
 
.formItem {
  margin-bottom: 10px;
}
</style>
