<template>
    <div class="sourceRow">
      <div class="resourceColumn">
        <label class="uploadYourFiles">Upload your Files</label>
      </div>
      <div class="resourceColumn">
        <label class="addFromURL">Add From URL</label>
      </div>
      <div class="resourceColumn">
        <div >
          <label class="addFromURL">Add From Source</label>
          <label class="">Dropbox</label>
          <label class="">Google</label>
          <label class="">ShareFile</label>
          <label class="">Link to New Source</label>
        </div>
      </div>
    </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
export default {
  name: 'AddResourceBlock',
  props: {
  },
  data () {
    return {
    };
  },
  methods: {
    convertDate: convertDate,
    resourceAction: function (e) {
      // this.$router.push({name: 'editResource', params: { resourceId: this.resource.id }});
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

<style lang="scss" scoped>
@import '../../assets/scss/application.scss';

.searchBox {
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background: url(../../assets/images/search.svg) no-repeat scroll 14px 14px;
  background-color: white;
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  border-color: #979797;
  &::placeholder {
    color: #9B9B9B;
  }
}

.sourceRow {
   display: flex;
   flex-direction: row;
   margin: 20px 0px;
}


.uploadYourFiles {
  background: url(../../assets/images/upload-icon.svg) no-repeat scroll 14px 14px;
  border: dashed 1px black;
  font-size: 14px;
  padding: 14px;
  margin: 0px 5px;
}

.addFromURL {
  background: url(../../assets/images/add-url.svg) no-repeat scroll 14px 14px;
  border: dashed 1px black;
  font-size: 14px;
  padding: 14px;
  margin: 0px 5px;
}
</style>
