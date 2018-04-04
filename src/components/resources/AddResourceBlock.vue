<template>
    <div class="sourceRow">
      <div> 
        <label id="uploadYourFiles" class="uploadYourFiles dashedBox" title="Upload not available yet" @click="uploadFiles">Upload your Files</label>
      </div>
      <div>
        <label id="addFromUrl" class="addFromURL dashedBox" data-toggle="modal" data-target="#addUrlModal"  >Add From URL</label>
      </div>
      <div class="modal fade" id="addUrlModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
                <label class="modalTitle" id="exampleModalLabel">Add from URL</label>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
           </div>
           <div class="modal-body">
              <textarea id="filelinks" col="100" row="7" style="width:400px; height:100px" v-model="urls"/> 
           </div>
           <div class="modal-footer buttonFooter">
             <button type="button" class="btn addUrlButton" data-dismiss="modal"  @click="addResource">Add URLs to Lintol</button>
           </div>
         </div>
       </div>
     </div>
     <!--<div class="externalBox dashedBox">
       <label id="addFromSource" class="addFromSource">Add From Source</label>
       <label class="externalResource dropbox">Dropbox</label>
       <label class="externalResource google">Google</label>
       <label class="externalResource sharefile">ShareFile</label>
       <label class="newResource">Link to New Source</label>
     </div> -->
  </div>
</template>

<script>
import { convertDate } from '@/components/common/date.js';
import { STORE_DATA_RESOURCE, LOAD_LOGGED_IN_USER } from '@/state/action-types';

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
    uploadFiles: function () {
      var uploadTarget = null;

      if (this.loggedInUser && this.loggedInUser.driver && this.loggedInUser.driverServer) {
        var driver = this.loggedInUser.driver;
        var driverServer = this.loggedInUser.driverServer;
        if (driver === 'ckan') {
          uploadTarget = driverServer + '/dataset/new';
        } else if (driver === 'github') {
          uploadTarget = driverServer + '/new';
        }
      }

      if (uploadTarget) {
        window.open(uploadTarget, '_uploadFiles');
      }
    },
    addResource: function () {
      var urlArray = this.urls.replace(/[\n\r]+/g, '').split(',');
      console.log(urlArray);
      for (var index = 0; index < urlArray.length; index++) {
        var url = urlArray[index];
        var filename = url.replace(/^.*[\\/]/, '');
        var filetype = filename.split('.').pop();
        var resource = { source: 'External Link', url: url, filename: filename, filetype: filetype };
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
    loggedInUser: function () {
      return this.$store.state.loggedInUser;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_LOGGED_IN_USER);
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

.sourceRow {
   display: flex;
   flex-direction: row;
   margin: 20px 0px;
}

.uploadYourFiles {
  background: url(../../assets/images/upload-icon.svg) no-repeat scroll 0.875em 0.875em;
  font-size: 0.875em;
  padding: 14px 14px 14px 60px;
  margin: 0px 5px;
  min-width: 190px;
  font-weight: $bold;
  cursor: pointer; 
}

.addFromURL {
  background: url(../../assets/images/add-url.svg) no-repeat scroll 0.875em 0.875em;
  position: relative;
  background-color: #FAFAFA; 
  font-size: 0.875em;
  padding: 14px 14px 14px 50px;
  margin: 0px 5px;
  min-width: 190px;
  cursor: pointer; 
  font-weight: $bold;
  &:hover {
    box-shadow: 0px 0px 4px  #888888;
  }
}

.dashedBox {
  background-color: #FAFAFA; 
  border: dashed 1px #979797;
  border-radius: 4px;
}

.addFromSource {
  font-weight: $bold; 
  font-size: 0.875em;
}

.externalBox {
  padding: 12px 16px 0px 16px;  
}

.externalResource {
  border-radius: 40px;
  padding: 5px;
  font-size: 0.6875em;
  width: 100px;
  text-transform: capitalize;
  font-weight: $bold;
  color: white;
}

.newResource {
  color: $grey;
  font-size: 0.6875em;
  text-decoration: underline;
  font-weight: $bold;
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
.fade.in {
  opacity: 1;
}
.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}

.modal-backdrop .fade .in {
  opacity: 0.5 !important;
}

.modalTitle {
  font-weight: $bold;
}

.modal-backdrop.fade {
    opacity: 0.5 !important;
}

.buttonFooter {
  box-pack:start; 
  display: block;
}

.addUrlButton {
  background-color: $buttonColour; 
  border: none;
  font-size: 0.75em;
  padding: 13px;
  border-radius: 5px;
  color: $buttonText;
  box-shadow: 0px 0px 5px black;
  display: inline-block;
  font-weight: $bold;
  &:active {
    box-shadow: 0px 0px 0px black;
  }
  &:focus {
    outline:0;
    border: none;
  }
} 
</style>
