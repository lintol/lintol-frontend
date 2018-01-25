<template>
   <div id='validationDetails'>
    <label>Back to List</label>
    <div >
      <h3>{{ processorName }}</h3>
      <h4>{{ validationName }}</h4>
      <div id="app" style="width:1300px;height:500px;">
        <!--<v-map :zoom=9 :center="[54.543307, -6.744371]">-->
        <v-map :zoom=8 :center="[54.543307, -6.744371]">
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker :lat-lng="[54.643307, -6.744371]"></v-marker>
          <v-polygon :lat-lngs="boundary"  color="#ffffff"></v-polygon>
        </v-map>
      </div>
      <map-marker-detail :key="index" v-for="(index, markerDetail) in markerDetails" markerNumber="index" validationName="markerDetail.validationName" validationDescription="markerDetail.description"></map-marker-detail> 
    </div>
  </div>
</template>

<script>
import MapMarkerDetail from './MapMarkerDetail';

export default {
  name: 'ReportView',
  props: {
    processorName: {
      type: String,
      required: true,
      default: 'GeoJson Boundary Checker'
    },
    validationName: {
      type: String,
      required: true,
      default: 'Boundary Error'
    },
    boundary: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      markerDetails: []
    };
  },
  components: {
    MapMarkerDetail: MapMarkerDetail
  },
  computed: {
  },
  mounted: function () {
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '~@/assets/scss/application.scss';
@import "~leaflet/dist/leaflet.css";

</style>
