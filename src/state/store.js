import Vuex from 'vuex';
import Vue from 'vue';

import * as a from './action-types';
import * as m from './mutation-types';
import axios from 'axios';

Vue.use(Vuex);

var apiPrefix = process.env.API_PREFIX;

const store = new Vuex.Store({
  state: {
    profiles: [],
    currentProfile: null,

    reports: [],
    currentReport: null,

    processors: []
  },
  actions: {
    [a.LOAD_PROFILES] (state) {
      axios.get(apiPrefix + '/profiles/').then(response => {
        var profiles = response.data;
        state.commit(m.SET_PROFILES, profiles.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.LOAD_PROFILE] (state, profileId) {
      axios.get(apiPrefix + '/profiles/' + profileId).then(response => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.SAVE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles/' + profile.id;

      axios.put(url, profile).then((response) => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile.data);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },
    [a.STORE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles';

      axios.post(url, profile).then((response) => {
        var profile = response.profile;
        state.commit(m.SET_CURRENT_PROFILE, profile.data);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },

    [a.LOAD_REPORTS] (state) {
      axios.get(apiPrefix + '/reports/').then(response => {
        var reports = response.data;
        state.commit(m.SET_REPORTS, reports.data);
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    [a.LOAD_REPORT] (state, reportId) {
      axios.get(apiPrefix + '/reports/' + reportId).then(response => {
        var report = response.data;
        state.commit(m.SET_CURRENT_REPORT, report.data);
      }, response => {
        console.log('Couldnt get report.');
      });
    },

    [a.LOAD_PROCESSORS] (state) {
      var url = apiPrefix + '/processors/';

      axios(url).then((response) => {
        var processors = response.data;
        state.commit(m.SET_PROCESSORS, processors.data);
      }).catch(function (error) {
        console.log('Error get processors:' + error);
      });
    },
    [a.STORE_PROCESSOR] (state, processor) {
      var url = apiPrefix + '/processors';

      axios.post(url, processor).then((response) => {
        console.log('Added processor');
      }).catch(function (error) {
        console.log('Error adding processor:' + error);
      });
    },

    [a.STORE_DATA_RESOURCE] (state, dataResource) {
      var url = apiPrefix + '/data-resources';

      axios.post(url, dataResource).then((response) => {
        console.log('Added data resource');
      }).catch(function (error) {
        console.log('Error adding data resource:' + error);
      });
    }
  },
  mutations: {
    [m.SET_PROFILES] (state, profiles) {
      state.profiles = profiles;
    },
    [m.RESET_PROFILES] (state) {
      state.profiles = [];
    },
    [m.SET_CURRENT_PROFILE] (state, profile) {
      state.currentProfile = profile;
    },
    [m.UNSET_CURRENT_PROFILE] (state) {
      state.currentProfile = null;
    },

    [m.SET_REPORTS] (state, reports) {
      state.reports = reports;
    },
    [m.RESET_REPORTS] (state) {
      state.reports = [];
    },
    [m.SET_CURRENT_REPORT] (state, report) {
      state.currentReport = report;
    },
    [m.UNSET_CURRENT_REPORT] (state) {
      state.currentReport = null;
    },

    [m.SET_PROCESSORS] (state, processors) {
      state.processors = processors;
    },
    [m.RESET_PROCESSORS] (state) {
      state.processors = [];
    },

    [m.SET_DATA_RESOURCES] (state, dataResource) {
      state.dataResources = dataResource;
    },
    [m.RESET_DATA_RESOURCES] (state) {
      state.dataResources = [];
    },
    [m.SET_CURRENT_DATA_RESOURCE] (state, dataResource) {
      state.currentDataResource = dataResource;
    },
    [m.UNSET_CURRENT_DATA_RESOURCE] (state) {
      state.currentDataResource = null;
    }
  }
});

export default store;
