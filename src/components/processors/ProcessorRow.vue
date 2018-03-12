<template>
  <div id="processors-row" class="shadedRow">
    <div class="processorRow">
      <div class="processorMainColumn center">
        <div class="rightSeparator">
          <label class="mainColumnHeader">{{ processor.name }}</label>
          <p class="description">{{ processor.description }}</p>
        </div>
      </div>
      <div class="processorColumn center">
        <label>Created</label>
        <label>{{ convertDate(processor.created_at) }}</label>
      </div>
      <div class="processorColumn center">
        <label>Updated</label>
        <label>{{ convertDate(processor.updated_at) }}</label>
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
    };
  },
  methods: {
    convertDate: convertDate
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
  flex: 1;
  min-width: 150px;
  label:nth-child(1) {
    font-weight: bold;
    font-size: 11px;
  }
  label:nth-child(2) {
    font-size: 10px;
    margin-top:3px;
  }
}

.configurationsColumn {
  min-width: 150px;
  label:nth-child(1) {
    font-weight: bold;
    font-size: 21px;
  text-align: center;
  }
  label:nth-child(2) {
    font-size: 8px;
  text-align: center;
  }
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
}

.mainColumnHeader {
  color: $orange;
  font-weight: bold;
  font-size: 12px;
}

.description {
   font-size: 11px;
   word-wrap: break-word;
}
</style>
