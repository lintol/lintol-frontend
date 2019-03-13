<template>
      <b-card>
      <!-- <label  slot="header" class="xmark" @click="removeProcessor">&#x274C; </label> -->
        <b-row>
          <b-col cols="1" >
            <div style="text-align:center;">
            <svg width="25" height="25" style="display: block;margin: auto;">
                <circle cx="13" cy="13" r="12" stroke="grey" stroke-width="1" fill="none" />
                <circle cx="13" cy="13" r="7" stroke="#F1592A" stroke-width="1" fill="#F1592A" />
              </svg>
            </div>
          </b-col>
          <b-col cols="7">
            <div>
            <label id="processorTitle" class="processorTitle">{{ processor.name }}</label>
            <p id="processorDescription" class="processorDescription item2" >{{ processor.description }}</p>
          </div>
          </b-col>
          <b-col cols="4">
            <label slot="header" @click="removeProcessor">&#x274C; </label>
            <label class="editConfigurationLabel" v-if="!editConfiguration && !configurationOptionsEmtpy(configurationOptions)" @click="editConfiguration = !editConfiguration">Edit Configuration</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div v-if="editConfiguration && configurationOptions">
              <vue-form-generator :schema="configurationOptions" :model="model" :options="formOptions"></vue-form-generator>
              <label class="saveLabel" v-if="editConfiguration" @click="saveConfiguration">Save Configuration</label>
            </div>
          </b-col>
        </b-row>
    </b-card>
      <!-- <div>
      <label class="xmark" @click="removeProcessor">&#x274C; </label>
      <div class="processorContainer" v-if="configuration.processor">
        <div class="xSmall">
         <div class="orangeCheckbox">
           <input type="checkbox" value="1" id="active" name="active" checked="checked" disabled/>
           <label for=active></label>
         </div>
        </div>
        <div class="largeSpace">
          <div>
            <label id="processorTitle" class="processorTitle item1">{{ processor.name }}</label>
            <p id="processorDescription" class="processorDescription item2" >{{ processor.description }}</p>
          </div>
        </div>
        <div class="smallSpace">
         <label class="editConfigurationLabel" v-if="!editConfiguration && configurationOptions" @click="editConfiguration = !editConfiguration">Edit Configuration</label>
        </div>
      </div>
      <div v-if="editConfiguration && configurationOptions">
        <vue-form-generator :schema="configurationOptions" :model="model" :options="formOptions"></vue-form-generator>
        <label class="saveLabel" v-if="editConfiguration" @click="saveConfiguration">Save Configuration</label>
      </div>
      </div> -->
</template>

<script>
import VueFormGenerator from 'vue-form-generator';

export default {
  name: 'ProcessorConfiguration',
  props: {
    value: {
      type: String,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  inject: false,
  data () {
    return {
      model: {},
      checkboxValue: false,
      editConfiguration: false,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    };
  },
  methods: {
    saveConfiguration: function () {
      this.$emit('input', JSON.stringify(this.model));
      this.editConfiguration = !this.editConfiguration;
    },
    removeProcessor: function () {
      this.$emit('removeProcessor', this.processor.name);
    },
    configurationOptionsEmtpy: function (configOptions) {
      return Object.keys(configOptions).length === 0;
    }
  },
  components: {
    'vue-form-generator': VueFormGenerator.component
  },
  computed: {
    processor: function () {
      return this.configuration.processor;
    },
    configurationOptions: function () {
      if (this.processor.configurationOptions) {
        try {
          return JSON.parse(this.processor.configurationOptions);
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  },
  mounted: function () {
    try {
      this.model = JSON.parse(this.value);
    } catch (e) {
      this.model = {};
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~@/assets/scss/application.scss';

.xmark {
  cursor: pointer;
  font-size: 1em;
  float: right;
}

.processorTitle {
  font-weight: $bold;
  font-size: 0.75em;
}

.processorDescription {
  font-size: 0.688em;
}

.editConfigurationLabel {
  text-decoration: underline;
  cursor: pointer;
  font-weight: $bold;
  font-size: 0.688em;
}

.saveLabel {
  text-decoration: underline;
  cursor: pointer;
  font-weight: $bold;
  float: right;
  font-size: 0.688em;
  margin-top: 15px;
}

.card-header {
  border-bottom: none;
  padding: 0px 20px 0px 0px;
  background-color: white;
}

.card-body {
  border-bottom: none;
}
</style>
