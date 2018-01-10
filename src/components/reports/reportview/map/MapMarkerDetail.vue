<template>
  <div class="rowBorders">
    <p>Marker {{ markerNumber }}</p>
    <p>{{ validationName }}</p>
    <p>{{ validationDescription }}</p>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    markerNumber: {
      type: Number,
      required: true
    },
    validationName: {
      type: String,
      required: true
    },
    validationDescription: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {
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
@import '~@/assets/scss/application.scss';

.rowBorders {
  border: solid 2px black;
  border-radius: 20px;
}
</style>
