<template>
   <div id='validationDetails'>
    <router-link :to="{name: 'listReportView', params: {'reportId': this.reportId}}" class="navigateToReports"> &#x3008; Back to List</router-link>
    <div >
      <p class="processor">{{ reportItem.processor }}</p>
      <p class="itemType">{{ reportItem.code }}</p>
      <div id="app" style="width:1100px;height:500px;">
        <!--<v-map :zoom=9 :center="[54.543307, -6.744371]">-->
        <v-map :zoom=8 :center="[54.543307, -6.744371]">
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker :lat-lng="[54.643307, -6.744371]"></v-marker>
          <v-geojson-layer :geojson="boundaryObject"></v-geojson-layer>
        </v-map>
      </div>
      <!--<map-marker-detail v-for="(index, markerDetail) in markerDetails" markerNumber="index" validationName="markerDetail.validationName" validationDescription="markerDetail.description"></map-marker-detail> -->
      <map-marker-detail :validationName="reportItem.code" :validationDescription="reportItem.message"></map-marker-detail>
    </div>
  </div>
</template>

<script>
import MapMarkerDetail from './MapMarkerDetail';
import axios from 'axios';
export default {
  name: 'ReportView',
  props: {
    reportMetaData: {
      type: String,
      required: true
    },
    reportItem: {
      type: Object,
      required: true
    },
    reportId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      markerDetails: [],
      boundaryObject: ''
    };
  },
  components: {
    MapMarkerDetail: MapMarkerDetail
  },
  computed: {
    reportMetaDataObject: function () {
      return JSON.parse(this.reportMetaData);
    }
  },
  mounted: function () {
    this.boundaryUrl = 'https://www.opendatani.gov.uk/dataset/88ae4334-88fd-45c1-af63-7d64b4d88f91/resource/250e12b8-d8a7-41b6-98d4-f8862449d61c/download/agreed-revised-proposals.geojson';
    axios.get(this.boundaryUrl).then(response => {
      this.boundaryObject = response.data;
    }, response => {
      console.log('Couldnt get data resources for account.');
    });
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';
@import "~leaflet/dist/leaflet.css";
.processor {
  font-size: 17px;
  color: #333333;
  font-weight: bold;
}

.itemType {
  font-size: 12px;
  color: #777776;
  font-weight: bold;
}

</style>
