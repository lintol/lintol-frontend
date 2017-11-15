<template>
   <div class="processor">
        <div class="item1">
          <label></></label>
          <input id="select" type="checkbox" class="roundCheckbox" v-model=checkboxValue />
        </div>
        <label id="processorTitle" class="processorTitle item1">{{ title }}</label>
        <p id="processorDescription" class="processorDescription item2" >{{ description }}</p>
        <a id="processorMoreInfo" class="moreInfo item1" href="https://www.w3schools.com" >More Info</a>
      </div>
      </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Name',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    moreInfo: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      checkboxValue: false
    };
  },
  methods: {
  },
  components: {
  },
  computed: {
  },
  watch: {
    checkboxValue: function () {
      console.log('checbox changed:' + this.checkboxValue);
      if (this.checkboxValue) {
        this.$emit('processorSelected', this.type, 'add');
      } else {
        this.$emit('processorSelected', this.type, 'remove');
      }
    }
  },
  mounted: function () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/scss/application.scss';

.item2 {
  flex-basis: 2;
}

.item1 {
  flex-basis: 1;
}

.processorTitle {
  font-weight: bold;
}

.moreInfo {
  color: orange;
  margin-top: auto;
}

.processor {
  font-size: 8pt;
  width: 175px;
  height: 120px;
  border: solid 1px black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 3px; 
}

.roundCheckbox {
  float: right;  
}
</style>
