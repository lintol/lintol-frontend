<template>
  <div class="rowBorders">
    <p class="issueType">{{ validationName }}</p>
    <p class="issueDescription">{{ validationDescription }}</p>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationName: {
      type: String,
      required: true
    },
    validationDescription: {
      type: String,
      required: true
    },
    validationItem: {
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
  border: 1px solid #ED1D24;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
}

.issueType {
  color: #777776;
  font-weight: bold;
}

.issueDescription {
  color: #777776;
}
</style>
