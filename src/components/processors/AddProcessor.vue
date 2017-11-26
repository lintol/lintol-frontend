<template>
  <div id="addProcessorPanel">
    <h1>{{ title }}</h1>
    <p class="instructions">Instructions</p>
    <div class="formContainer">
      <input id="processorName" class="formItem" placeholder="Name" type="text" v-model=name />
      <textarea id="processorDescription" class="formItem" rows="4" cols="50" placeholder="Description" v-model=description />
      <div>
      <input id="uploadScript" type="button" value="Upload Script"></input>
      </div>
      <div>
      </div>
      <div>
        <button id="addProcessor" class="addProcessorButton" @click=addProcessor>Add Processor</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Name',
  props: {
  },
  data () {
    return {
      title: 'Add Processor',
      name: '',
      description: '',
      script: '',
      availableProcessors: [],
      choosenProcessors: []
    };
  },
  methods: {
    addProcessor: function () {
      var url = this.$apiPrefix + '/processors/';
      var processor = {};
      processor.name = this.name;
      processor.description = this.description;
      // processor.script = this.script;
      processor.creator = 'Martin';
      processor.uniqueTag = 'uniq-66-' + this.name;
      axios.post(url, processor).then((response) => {
        this.$router.push({name: 'processorTable'});
        console.log(response);
      }).catch(function (error) {
        console.log('Error adding processor:' + error);
      });
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
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
  flex-direction: row;
  flex-wrap: wrap;
}
 
.formItem {
  margin-bottom: 10px;
}
</style>
