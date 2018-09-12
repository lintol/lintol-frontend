<template>
  <div @click="showProcessorResultList" :class="{ activatedProcessorBox: activated, deactivatedProcessorBox: !activated }" class="box">
    <div class="information">
      <div class="column">
        <label>{{ name }}</label>
        <label>{{ description }}</label>
        <label @click="openProcessorValidations" class="navigationLink">View Errors</label>
      </div>
      <div class="column">
        <label>{{ numberOfErrors }}</label>
        <label>Errors</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportView',
  props: {
    name: {
      type: String,
      required: false,
      default: 'Default Name'
    },
    description: {
      type: String,
      required: false,
      default: 'Default Description about the processor. I wish i could do more'
    },
    numberOfErrors: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data () {
    return {
      activated: true
    };
  },
  methods: {
    showProcessorResultList: function () {
      console.log('clicked');
      this.activated = !this.activated;
    },
    openProcessorValidations: function () {
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function () {
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';

.box {
  min-width:250px;
  min-height:100px;
}

.column {
  display: flex;
  flex-direction: column;
}

.errors {

}
label {
  color: white;
  text-overflow: ellipsis; 
}

.information {
  display: flex;
  flex-direction: row;
}

.activatedProcessorBox {
   background-color: $orange;
}

.deactivatedProcessorBox {
   background-color: $orange;
}

</style>
