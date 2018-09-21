<template>
<<<<<<< HEAD
  <div id="processors-row" class="">
    <b-row no-gutters class="processorRow shadedRow">
      <b-col sm='4' cols='9' class="processorMainColumn center first" v-on:click='openTab'>
=======
  <div id="processors-row" class="shadedRow">
    <div class="processorRow">
      <div class="processorMainColumn center">
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
        <div class="rightSeparator">
          <label class="mainColumnHeader">{{ processor.name }}</label>
          <p class="description">{{ processor.description }}</p>
        </div>
<<<<<<< HEAD
      </b-col>
      <b-col v-bind:class='{open: isOpen}' cols = '10' offset='1' order='3' class='third bottom-bar show'>

      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='6' class="processorColumn center third fullSize">
        <label>Created</label>
        <label>{{ convertDate(processor.created_at.date) }}</label>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='6' class="processorColumn center third fullSize">
        <label>Updated</label>
        <label>{{ convertDate(processor.updated_at.date) }}</label>
      </b-col>
      <b-col v-bind:class='{open: isOpen}' sm='2' cols='12' class="processorColumn center third fullSize">
        <label>Unique Tag</label>
        <label>{{ processor.uniqueTag }}</label>
      </b-col>
      <b-col sm='2' cols='3' class="configurationsColumn center second" v-on:click='openTab'>
        <label>{{ processor.configurationCount ? processor.configurationCount : 0 }}</label>
        <label>Configurations</label>
      </b-col>
    </b-row>
=======
      </div>
      <div class="processorColumn center">
        <label>Created</label>
        <label>{{ convertDate(processor.created_at.date) }}</label>
      </div>
      <div class="processorColumn center">
        <label>Updated</label>
        <label>{{ convertDate(processor.updated_at.date) }}</label>
      </div>
      <div class="processorColumn center">
        <label>Unique Tag</label>
        <label>{{ processor.uniqueTag }}</label>
      </div>
      <div class="configurationsColumn center">
        <label>{{ processor.configurationCount ? processor.configurationCount : 0 }}</label>
        <label>Configurations</label>
      </div>
    </div>
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
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
<<<<<<< HEAD
      isOpen: true
    };
  },
  methods: {
    convertDate: convertDate,
    openTab: function () {
      this.isOpen = !this.isOpen;
    }
=======
    };
  },
  methods: {
    convertDate: convertDate
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
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
<<<<<<< HEAD
=======
  flex: 1;
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
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
<<<<<<< HEAD

=======
 
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.processorMainColumn {
<<<<<<< HEAD
=======
  flex: 2;
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
  min-height: 80px;
  padding: 10px;
}

.processorRow {
<<<<<<< HEAD
=======
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
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
<<<<<<< HEAD

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
.rightSeparator{
  padding-right: 5px;
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

  .show{
    display: flex;
  }

  .open{
    display: none;
  }

  .fullSize{
    text-align: center;
  }
}
=======
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
</style>
