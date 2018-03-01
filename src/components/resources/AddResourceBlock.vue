<template>
    <div class="sourceRow">
      <div class="resourceColumn">
        <label id="uploadYourFiles" class="uploadYourFiles">Upload your Files</label>
      </div>
      <div class="resourceColumn">
        <label id="addFromUrl" class="addFromURL" data-toggle="modal" data-target="#addUrlModal"  >Add From URL</label>
      </div>
      <div class="modal fade" id="addUrlModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Url</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <textarea id="filelinks" col="100" row="7" style="width:400px; height:100px" v-model="urls"/> 
              </div>
          <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <button type="button" class="btn btn-primary" data-dismiss="modal"  @click="addResource">Save changes</button>
          </div>
    </div>
  </div>
</div>
      <div class="resourceColumn">
        <div >
          <label id="addFromSource" class="addFromURL">Add From Source</label>
          <label class="externalResource dropbox">Dropbox</label>
          <label class="externalResource google">Google</label>
          <label class="externalResource sharefile">ShareFile</label>
          <label class="newResource">Link to New Source</label>
        </div>
      </div>
    </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
import { STORE_DATA_RESOURCE } from '@/state/action-types';
export default {
  name: 'AddResourceBlock',
  props: {
  },
  data () {
    return {
      urls: ''
    };
  },
  methods: {
    convertDate: convertDate,
    resourceAction: function (e) {
      // this.$router.push({name: 'editResource', params: { resourceId: this.resource.id }});
    },
    /* addResource: function (action) {
      this.$emit('addResource', action);
    }, */
    addResource: function () {
      var urlArray = this.urls.replace(/[\n\r]+/g, '').split(',');
      console.log(urlArray);
      for (var index = 0; index < urlArray.length; index++) {
        var url = urlArray[index];
        var filename = url.replace(/^.*[\\/]/, '');
        var filetype = filename.split('.').pop();
        var resource = { source: 'External Link', url: url, filename: filename, user: 'martin', filetype: filetype };
        this.$store.dispatch(STORE_DATA_RESOURCE, resource).then(() => {
        });
      }
      this.$emit('addResource', resource);
      this.urls = '';
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

.sourceRow {
   display: flex;
   flex-direction: row;
   margin: 20px 0px;
}


.uploadYourFiles {
  background: url(../../assets/images/upload-icon.svg) no-repeat scroll 14px 14px;
  border: dashed 1px black;
  font-size: 14px;
  padding: 14px 14px 14px 60px;
  margin: 0px 5px;
  min-width: 190px;
  font-weight: bold;
  cursor: pointer; 
}

.addFromURL {
  background: url(../../assets/images/add-url.svg) no-repeat scroll 14px 14px;
  position: relative;
  border: dashed 1px black;
  font-size: 14px;
  padding: 14px 14px 14px 50px;
  margin: 0px 5px;
  min-width: 190px;
  cursor: pointer; 
  font-weight: bold;
  &:hover {
    box-shadow: 0px 0px 4px  #888888;
  }
}

.externalResource {
  border-radius: 40px;
  padding: 5px;
  font-size: 11px;
  width: 100px;
  text-transform: capitalize;
  font-weight: bold;
  color: white;
}

.newResource {
  color: #777776;
  font-size: 11px;
  text-decoration: underline;
  font-weight: bold;
}

.dropbox {
  background-color: #0070E0;
}

.google {
  background-color: #FAC712;
}

.sharefile {
  background-color: #76C54C;
}


</style>
