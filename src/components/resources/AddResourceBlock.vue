<template>
    <b-row class="sourceRow">
      <b-row>
        <b-col cols='12' sm='7'>
          <b-btn id="uploadYourFiles" class="uploadYourFiles dashedBox" @click="uploadFiles">Upload your Files</b-btn>
        </b-col>
        <b-col cols='12' sm='5'>
          <b-btn id="addFromURL" v-b-modal.addUrlModal class="addFromURL dashedBox">Add From URL</b-btn>
        </b-col>
      </b-row>
      <b-modal id="addUrlModal" title="Add from URL">
          <b-container>
            <b-row>
              <b-col cols="12" class="mt-3">
                <textarea id="urlList" style="width:400px; height:100px"  rows="4" placeholder="Urls" v-model="urls" data-vv-name="urls" data-vv-as="Url Links" v-validate="'required'" :class="{ warningBorder: vErrors.has('urls') }" />
                <p v-show="vErrors.has('urls')" class="warningText" >{{ vErrors.first('urls') }}</p>
              </b-col>
            </b-row>
          </b-container>
          <div slot="modal-footer" class="w-100">
            <b-btn id="addFromURL" v-b-modal.addUrlModal class="addUrlButton" @click="addResource">Add URLs to Lintol</b-btn>
          </div>
        </b-modal>
     <!--<div class="externalBox dashedBox">
       <label id="addFromSource" class="addFromSource">Add From Source</label>
       <label class="externalResource dropbox">Dropbox</label>
       <label class="externalResource google">Google</label>
       <label class="externalResource sharefile">ShareFile</label>
       <label class="newResource">Link to New Source</label>
     </div> -->
  </b-row>
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
      urls: '',
      showAddUrlModal: true
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
      this.$validator.validateAll().then((result) => {
        var urlArray = this.urls.replace(/[\n\r]+/g, '').split(',');
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
        this.showAddUrlModal = false;
      }).catch((error) => {
        console.log('Validation error:' + error);
      });
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
  margin-top : 2px;
  color: black;
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
  color: #777776;
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

@media (max-width: 376px){
  .dashedBox{
    width: 100%;
    text-align: center;
  }
}
</style>
