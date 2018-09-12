<template>
  <div class="rowBorders">
    <div></div>
    <p>{{ validationObject.errorName }}</p>
    <p>{{ validationObject.errordescription }}</p>
    <p>More Details &#x3e;</p>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationObject: {
      type: Object,
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
