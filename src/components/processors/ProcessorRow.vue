<template>
  <div id="processors-row" class="">
    <b-row no-gutters class="processorRow shadedRow">
      <b-col sm='4' cols='9' class="processorMainColumn center first" v-on:click='openTab'>
        <div class="rightSeparator">
          <label class="mainColumnHeader">{{ processor.name }}</label>
          <p class="description">{{ processor.description }}</p>
        </div>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols = '12' order='3' class='third bottom-bar show'>

      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='12' class="processorColumn center third">
        <label>Created</label>
        <label>{{ convertDate(processor.created_at.date) }}</label>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='12' class="processorColumn center third">
        <label>Updated</label>
        <label>{{ convertDate(processor.updated_at.date) }}</label>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='12' class="processorColumn center third">
        <label>Unique Tag</label>
        <label>{{ processor.uniqueTag }}</label>
      </b-col>
      <b-col sm='2' cols='3' class="configurationsColumn center second" v-on:click='openTab'>
        <label>{{ processor.configurationCount ? processor.configurationCount : 0 }}</label>
        <label>Configurations</label>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'ProcessorRow',
  props: {
    processor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOpen: true
    };
  },
  methods: {
    convertDate: convertDate,
    openTab: function () {
      this.isOpen = !this.isOpen;
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

/* Because bootstrap has all labels margin-bottom: 0.5rem */
label {
  margin-bottom: 0px;
}

.processorColumn {
  label:nth-child(1) {
    font-weight: $bold;
    font-size: 0.688em;
  }
  label:nth-child(2) {
    font-size: 0.625em;
    margin-top:3px;
  }
}

.configurationsColumn {
  label:nth-child(1) {
    font-weight: $bold;
    font-size: 1.313em;
    text-align: center;
  }
  label:nth-child(2) {
    font-size: 0.5em;
    text-align: center;
  }
  padding-right: 10px;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.processorMainColumn {
  min-height: 80px;
  padding: 10px;
}

.processorRow {
  padding-right: 5px;
}

.mainColumnHeader {
  color: $orange;
  font-weight: $bold;
  font-size: 0.75em;
}

.description {
   font-size: 0.688em;
   word-wrap: break-word;
}

.first{
  order: 0;
}

.second{
  order : 0;
}

.third{
  order: 0;
}

.bottom-bar{
  border-bottom:1px solid #E5E5E5;
}

.open{
  display: flex;
}
.show{
  display: none;
}
@media (max-width: 376px){
  .first{
    order: 1;
  }

  .second{
    order : 2;
  }

  .third{
    order: 3;
    padding: 5px 0 5px 10px;
  }

  .open{
    display: none;
  }
  .show{
    display: block;
  }
}
</style>
