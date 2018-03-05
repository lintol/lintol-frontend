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
          <v-marker :lat-lng="[reportItem.item.entity.definition.coordinates[1], reportItem.item.entity.definition.coordinates[0]]" v-on:l-click="highlightError(1)"></v-marker>
          <v-geojson-layer :geojson="boundaryObject"></v-geojson-layer>
        </v-map>
      </div>
      <!--<map-marker-detail v-for="(index, markerDetail) in markerDetails" markerNumber="index" validationName="markerDetail.validationName" validationDescription="markerDetail.description"></map-marker-detail> -->
      <map-marker-detail :class="{ highlight: highlightMarkerDetail == 1 }" :validationName="reportItem.code" :validationItem="reportItem.item" :validationDescription="reportItem.message"></map-marker-detail>
      <table v-if="highlightMarkerDetail" class="markerDetailTable">
        <tr v-for="(value, field) in reportItem.item.properties">
          <td>{{ field }}</td><td>{{ value }}</td>
        </tr>
      </table>
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
      boundaryObject: '',
      highlightMarkerDetail: 0
    };
  },
  methods: {
    highlightError: function () {
      console.log('highlight');
      this.highlightMarkerDetail = 1;
    }
  },
  components: {
    MapMarkerDetail: MapMarkerDetail
  },
  computed: {
    reportMetaDataObject: function () {
      return JSON.parse(this.reportMetaData);
    },
    boundaryUrl: function () {
      var url = 'http://osni-spatial-ni.opendata.arcgis.com/datasets/d9dfdaf77847401e81efc9471dcd09e1_0.geojson';

      if (this.reportMetaDataObject && 'supplementary' in this.reportMetaDataObject) {
        var boundary = this.reportMetaDataObject.supplementary.find(function (supplementary) {
          return (supplementary.type === 'boundary');
        });
        if (boundary) {
          url = boundary.source;
        }
      }

      /* TODO: check why this is not working in a watcher for boundaryUrl */
      axios.get(url).then(response => {
        this.boundaryObject = response.data;
      }, response => {
        console.log('Couldnt get data resources for account.');
      });

      return url;
    }
  },
  mounted: function () {
  },
  watch: {
    boundaryUrl: function (boundaryUrl) {
    }
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

.highlight {
   background-color: DarkSalmon;
}

.markerDetailTable {
  padding: 1%;
  width: 100%;
}

.markerDetailTable tr:nth-child(even) {
  background-color: #EEEEEE
}

.markerDetailTable tr:nth-child(odd) {
  background-color: #DDDDDD
}

</style>
