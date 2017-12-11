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
        state.commit(m.SET_PROFILES, response.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.LOAD_PROFILE] (state, profileId) {
      axios.get(apiPrefix + '/profiles/' + profileId).then(response => {
        state.commit(m.SET_CURRENT_PROFILE, response.data);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.SAVE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles/' + profile.id;

      axios.put(url, profile).then((response) => {
        state.commit(m.SET_CURRENT_PROFILE, response.data);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },
    [a.STORE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles';

      axios.post(url, profile).then((response) => {
        state.commit(m.SET_CURRENT_PROFILE, response.data);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },

    [a.LOAD_REPORTS] (state) {
      axios.get(apiPrefix + '/reports/').then(response => {
        state.commit(m.SET_REPORTS, response.data);
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    [a.LOAD_REPORT] (state, reportId) {
      axios.get(apiPrefix + '/reports/' + reportId).then(response => {
        state.commit(m.SET_CURRENT_REPORT, response.data);
      }, response => {
        console.log('Couldnt get report.');
      });
    },

    [a.LOAD_PROCESSORS] (state) {
      var url = apiPrefix + '/processors/';

      axios(url).then((response) => {
        state.commit(m.SET_PROCESSORS, response.data);
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
    }
  }
});

export default store;
