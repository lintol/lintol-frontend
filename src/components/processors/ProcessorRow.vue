<template>
  <div id="processors-row" class="shadedRow">
    <div class="processorRow">
      <div class="processorMainColumn center">
        <div class="rightSeparator">
          <label class="mainColumnHeader">{{ processor.attributes.name }}</label>
          <p>{{ processor.attributes.description }}</p>
        </div>
      </div>
      <div class="processorColumn center">
        <label class="columnHeader">Created</label>
        <label>{{ convertDate(processor.attributes.created_at) }}</label>
      </div>
      <div class="processorColumn center">
        <label class="columnHeader">Updated</label>
        <label>{{ convertDate(processor.attributes.updated_at) }}</label>
      </div>
      <div class="processorColumn center">
        <label class="columnHeader" >Unique Tag</label>
        <label>{{ processor.attributes.uniqueTag }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
    };
  },
  methods: {
    convertDate: function (dateString) {
      return moment(dateString).format('Do MMMM YYYY');
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

.processorColumn {
  min-width: 150px;
  flex: 1;
}
 
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.processorMainColumn {
  flex: 2;
  min-height: 80px;
  padding: 10px;
}

.processorRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 10px;
}

.mainColumnHeader {
  color: $orange;
  font-weight: bold;
}
 
.columnHeader {
  font-weight: bold;
}

div .processorColumn p {
  margin: unset;
  color: grey;
}
</style>
