<template>
  <div id="processors-row" class="shadedRow">
    <div class="processorRow">
      <div class="processorColumn center">
        <label>{{ processor.name }}</label>
      </div>
      <div class="processorColumn center">
        <label>{{ processor.description }}</label>
      </div>
      <div class="processorColumn center">
        <p>{{ convertDate(processor.created_at) }}</p>
      </div>
      <div class="processorColumn center">
        <p>{{ convertDate(processor.updated_at) }}</p>
      </div>
      <div class="processorColumn center">
        <p>{{ processor.uniqueTag }}</p>
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

.processorAction {
  min-width: 120px;
  display: inline-block;
}
.processorRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
 
.columnTitle {
  font-weight: bold;
}

.rightSeparator {
  border-right: grey 1px solid;
}

.verticalAlign {
  vertical-align: middle;
}

div .processorColumn p {
  margin: unset;
  color: grey;
}

.processorPicture {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

</style>
