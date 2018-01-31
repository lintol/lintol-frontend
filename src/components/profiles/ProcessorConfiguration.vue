<template>
   <div class="processorConfiguration">
     <div class="processorContainer" v-if="configuration.processor">
       <div class="xSmall">
        <div class="orangeCheckbox">
          <input type="checkbox" value="1" id="active" name="active" checked="checked" disabled/>
          <label for=active></label>
        </div>
       </div>
       <div class="large">
         <div>
           <label id="processorTitle" class="processorTitle item1">{{ processor.name }}</label>
           <p id="processorDescription" class="processorDescription item2" >{{ processor.description }}</p>
         </div>
       </div>
       <div class="small">
        <label class="editLabel" v-if="!editConfiguration" @click="editConfiguration = !editConfiguration">Edit Configuration</label>
       </div>
     </div>
     <div v-if=editConfiguration >
        <textarea class="editArea">{{ configuration.userConfigurationStorage }}</textarea>
        <label class="saveLabel" v-if="editConfiguration" @click="saveConfiguration">Save Configuration</label>
     </div>
   </div>
</template>

<script>
export default {
  name: 'ProcessorConfiguration',
  props: {
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      checkboxValue: false,
      editConfiguration: false
    };
  },
  methods: {
    saveConfiguration: function () {
      this.editConfiguration = !this.editConfiguration;
    }
  },
  components: {
  },
  computed: {
    processor: function () {
      return this.configuration.processor;
    }
  },
  watch: {
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/scss/application.scss';

.xSmall {
  flex: 0.4;
  display: flex;
  align-items: center;
}

.small {
  flex: 1;
  display: flex;
  align-items: center;
}

.large {
  flex: 3;
  display: flex;
  align-items: center;
}

.processorTitle {
  font-weight: bold;
  font-size: 12px;
}

.processorDescription {
  font-size: 11px;
}

.processorContainer {
  padding: 5px;
  font-size: 8pt;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.processor {
  border: solid 1px black;
  border-radius: 3px;
  margin: 3px; 
  padding: 5px;
}

.roundCheckbox {
  float: right;  
}

.editLabel {
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  font-size: 8pt;
}

.saveLabel {
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  float: right;
  font-size: 8pt;
  margin-top: 15px;
}

.editArea {
  display: block;
  min-height: 125px;
  margin-left: 60px; 
  width: 85%;
  background-color: #D8D8D8;
}

.processorConfiguration {
  border: 1px solid #979797;
  border-radius: 4px;
  background-color: #FAFAF;
  padding: 10px;
  margin-top: 20px;
}
</style>
