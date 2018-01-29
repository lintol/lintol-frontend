import Vuex from 'vuex';
import Vue from 'vue';
import { JsonApiDataStore } from 'jsonapi-datastore';

import * as a from './action-types';
import * as m from './mutation-types';
import axios from 'axios';

Vue.use(Vuex);

var apiPrefix = process.env.MOCK
  ? process.env.MOCK_API_PREFIX
  : process.env.API_PREFIX;

function fromState (state) {
  var store = new JsonApiDataStore();
  store.graph = state.repository;
  return store;
}

const store = new Vuex.Store({
  state: {
    repository: {
      reports: {},
      processors: {},
      profiles: {},
      dataResources: {}
    },
    currentProfile: null,
    currentReport: null,
    currentDataResource: null,
    currentProcessor: null
  },
  actions: {
    [a.LOAD_DATA_RESOURCES] (state) {
      axios.get(apiPrefix + '/dataResources/').then(response => {
        var resources = response.data;
        state.commit(m.SET_DATA_RESOURCES, resources);
      }, response => {
        console.log('Couldnt get data resources for account.');
      });
    },
    [a.LOAD_PROFILES] (state) {
      axios.get(apiPrefix + '/profiles/').then(response => {
        var profiles = response.data;
        state.commit(m.SET_PROFILES, profiles);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.LOAD_PROFILE] (state, profileId) {
      axios.get(apiPrefix + '/profiles/' + profileId + '?include=configurations.processor').then(response => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.SAVE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles/' + profile.id;

      axios.put(url, profile).then((response) => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },
    [a.STORE_PROFILE] (state, profile) {
      state.commit(m.SET_CURRENT_PROFILE, profile);

      var url = apiPrefix + '/profiles';

      axios.post(url, profile).then((response) => {
        var profile = response.profile;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },

    [a.LOAD_REPORTS] (state) {
      axios.get(apiPrefix + '/reports/').then(response => {
        var reports = response.data;
        state.commit(m.SET_REPORTS, reports);
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    [a.LOAD_REPORT] (state, reportId) {
      axios.get(apiPrefix + '/reports/' + reportId + '?include=dataResource,profile').then(response => {
        var report = response.data;
        state.commit(m.SET_CURRENT_REPORT, report);
      }, response => {
        console.log('Couldnt get report.');
      });
    },

    [a.LOAD_PROCESSORS] (state) {
      var url = apiPrefix + '/processors/';

      axios(url).then((response) => {
        var processors = response.data;
        state.commit(m.SET_PROCESSORS, processors);
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
      var url = apiPrefix + '/dataResources';

      axios.post(url, dataResource).then((response) => {
        console.log('Added data resource');
      }).catch(function (error) {
        console.log('Error adding data resource:' + error);
      });
    }
  },
  getters: {
    reports: state => {
      console.log(state.repository);
      return fromState(state).findAll('reports');
    },
    processors: state => {
      return fromState(state).findAll('processors');
    },
    profiles: state => {
      return fromState(state).findAll('profiles');
    },
    dataResources: state => {
      return fromState(state).findAll('dataResources');
    }
  },
  mutations: {
    [m.SET_PROFILES] (state, profiles) {
      state.repository.profiles = {};
      fromState(state).sync(profiles);
    },
    [m.RESET_PROFILES] (state) {
      state.repository.profiles = {};
    },
    [m.SET_CURRENT_PROFILE] (state, profile) {
      var store = fromState(state);
      store.sync(profile);
      state.currentProfile = store.find('profiles', profile.data.id);
      console.log(state.currentProfile.configurations);
    },
    [m.UNSET_CURRENT_PROFILE] (state) {
      state.currentProfile = null;
    },

    [m.SET_REPORTS] (state, reports) {
      state.repository.reports = {};
      fromState(state).sync(reports);
    },
    [m.RESET_REPORTS] (state) {
      state.repository.reports = {};
    },
    [m.SET_CURRENT_REPORT] (state, report) {
      var store = fromState(state);
      store.sync(report);
      state.currentReport = store.find('reports', report.data.id);
    },
    [m.UNSET_CURRENT_REPORT] (state) {
      state.currentReport = null;
    },

    [m.SET_PROCESSORS] (state, processors) {
      state.repository.processors = {};
      fromState(state).sync(processors);
    },
    [m.RESET_PROCESSORS] (state) {
      state.repository.processors = {};
    },
    [m.SET_CURRENT_PROCESSOR] (state, processor) {
      var store = fromState(state);
      store.sync(processor);
      state.currentProcessor = store.find('processors', processor.data.id);
    },
    [m.UNSET_CURRENT_PROCESSOR] (state) {
      state.currentProcessor = null;
    },

    [m.SET_DATA_RESOURCES] (state, dataResource) {
      state.repository.dataResources = {};
      fromState(state).sync(dataResource);
    },
    [m.RESET_DATA_RESOURCES] (state) {
      state.repository.dataResources = {};
    },
    [m.SET_CURRENT_DATA_RESOURCE] (state, dataResource) {
      var store = fromState(state);
      store.sync(dataResource);
      state.currentDataResource = store.find('dataResources', dataResource.data.id);
    },
    [m.UNSET_CURRENT_DATA_RESOURCE] (state) {
      state.currentDataResource = null;
    }
  }
});

export default store;
