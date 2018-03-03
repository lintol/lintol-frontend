import Vuex from 'vuex';
import Vue from 'vue';
import { JsonApiDataStore, JsonApiDataStoreModel } from 'jsonapi-datastore';

import * as a from './action-types';
import * as m from './mutation-types';
import axios from 'axios';

var csrfToken = document.querySelector('meta[name="csrf-token"]').content;

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': csrfToken
};

axios.interceptors.response.use(
  response => { return response; },
  function (error) {
    if (error.response.status === 401) {
      window.location = process.env.LOGIN_URL;
    }
  }
);

Vue.use(Vuex);
var idctr = 1;

var apiPrefix = process.env.MOCK
  ? process.env.MOCK_API_PREFIX
  : process.env.API_PREFIX;

function fromState (state) {
  var store = new JsonApiDataStore();
  store.graph = state.repository;
  return store;
}

function toModelReal (type, attributes, relationships, id) {
  var jsonObj = new JsonApiDataStoreModel(type, id);
  for (var key in attributes) {
    jsonObj.setAttribute(key, attributes[key]);
  }
  var included = [];
  if (relationships) {
    for (var rel in relationships) {
      var relations = [];
      relationships[rel].relations.map(function (relation) {
        idctr += 1;
        var jsonRel = toModelReal(relationships[rel].type, relation, false, 'temp-id-' + idctr);
        relations.push(jsonRel.jsonObj);
        included.push(jsonRel.jsonObj.serialize().data);
      });

      /* TODO: submit upstream PR to allow optional temp-id */
      jsonObj.setRelationship(
        rel,
        relations
      );
    }
  }
  return { jsonObj, included };
}

function toModel (type, attributes, relationships, id) {
  var model = toModelReal(type, attributes, relationships, null);

  var serialized = model.jsonObj.serialize();
  if (model.included) {
    serialized.included = model.included;
  }
  return serialized;
}

const store = new Vuex.Store({
  state: {
    repository: {
      reports: {},
      processors: {},
      profiles: {},
      dataResources: {},
      users: {}
    },
    loggedInUser: null,
    currentUser: null,
    currentProfile: null,
    currentReport: null,
    currentDataResource: null,
    currentProcessor: null
  },
  actions: {
    [a.LOAD_DATA_RESOURCES] (state, page) {
      axios.get(apiPrefix + '/dataResources' + '?page=' + page).then((response) => {
        var resources = response.data;
        state.commit(m.SET_DATA_RESOURCES, resources);
      }, response => {
        console.log('Couldnt get data resources for account.');
      });
    },
    [a.SAVE_DATA_RESOURCE] (state, resource) {
      var url = apiPrefix + '/dataResources/' + resource.id;
      var jsonDataResource = toModel('dataResources', resource);

      axios.put(url, jsonDataResource).then((response) => {
        var resource = response.data;
        state.commit(m.SET_CURRENT_DATA_RESOURCE, resource);
      }).catch(function (error) {
        console.log('Error saving data resource:' + error);
      });
    },
    [a.DELETE_DATA_RESOURCE] (state, resource) {
      var url = apiPrefix + '/dataResources/' + resource.id;
      axios.delete(url).then((response) => {
        var resource = response.data;
        state.commit(m.UNSET_CURRENT_DATA_RESOURCE, resource);
      }).catch(function (error) {
        console.log('Error deleting data resource:' + error);
      });
    },
    [a.LOAD_PROFILES] (state) {
      axios.get(apiPrefix + '/profiles/').then((response) => {
        var profiles = response.data;
        state.commit(m.SET_PROFILES, profiles);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.LOAD_PROFILE] (state, profileId) {
      axios.get(apiPrefix + '/profiles/' + profileId + '?include=configurations.processor').then((response) => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }, response => {
        console.log('Couldnt get data profiles for account.');
      });
    },
    [a.SAVE_PROFILE] (state, { profile, configurations }) {
      var url = apiPrefix + '/profiles/' + profile.id;

      var jsonProfile = toModel('profiles', profile, {
        configurations: { type: 'processorConfigurations', relations: configurations }
      });

      axios.put(url, jsonProfile).then((response) => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },
    [a.STORE_PROFILE] (state, { profile, configurations }) {
      var jsonProfile = toModel('profiles', profile, {
        configurations: { type: 'processorConfigurations', relations: configurations }
      });

      var url = apiPrefix + '/profiles';

      axios.post(url, jsonProfile).then((response) => {
        var profile = response.data;
        state.commit(m.SET_CURRENT_PROFILE, profile);
      }).catch(function (error) {
        console.log('Error adding profile:' + error);
      });
    },

    [a.LOAD_USERS] (state) {
      axios.get(apiPrefix + '/users/').then((response) => {
        var users = response.data;
        state.commit(m.SET_USERS, users);
      }, response => {
        console.log('Couldnt get users.');
      });
    },
    [a.LOAD_USER] (state, userId) {
      axios.get(apiPrefix + '/users/' + userId).then((response) => {
        var user = response.data;
        state.commit(m.SET_CURRENT_USER, user);
      }, response => {
        console.log('Couldnt get user.');
      });
    },

    [a.LOAD_REPORTS] (state) {
      axios.get(apiPrefix + '/reports/').then((response) => {
        var reports = response.data;
        state.commit(m.SET_REPORTS, reports);
      }, response => {
        console.log('Couldnt get reports.');
      });
    },
    [a.LOAD_REPORT] (state, reportId) {
      axios.get(apiPrefix + '/reports/' + reportId + '?include=dataResource,profile').then((response) => {
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
    },

    [a.LOAD_LOGGED_IN_USER] (state) {
      axios.get(apiPrefix + '/users/me').then((response) => {
        var user = response.data;
        state.commit(m.SET_LOGGED_IN_USER, user);
      }, error => {
        console.log('Couldnt get logged in user:' + error);
      });
    }
  },
  getters: {
    users: state => {
      return fromState(state).findAll('users');
    },
    reports: state => {
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

    [m.SET_USERS] (state, users) {
      state.repository.users = {};
      fromState(state).sync(users);
    },
    [m.RESET_USERS] (state) {
      state.repository.users = {};
    },
    [m.SET_CURRENT_USER] (state, user) {
      var store = fromState(state);
      store.sync(user);
      state.currentUser = store.find('users', user.data.id);
    },
    [m.UNSET_CURRENT_USER] (state) {
      state.currentUser = null;
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
    },

    [m.SET_LOGGED_IN_USER] (state, user) {
      var store = fromState(state);
      store.sync(user);
      state.loggedInUser = store.find('users', user.data.id);
    },
    [m.UNSET_LOGGED_IN_USER] (state) {
      state.loggedInUser = null;
    }
  }
});

export default store;
