// import Vue from 'vue';
// import Vuex from 'vuex';
import * as a from '@/state/action-types';
import * as m from '@/state/mutation-types';
import { store, actions } from '@/state/store';
// import { shallow, createLocalVue } from '@vue/test-utils';
import * as API from '@/state/jsonapi.js';
// import * as axios from 'axios';

/* var currentProfile = {
  name: 'unit test profile',
  description: 'interesting description'
  creator: 'Martin',
  version: 7,
  uniqueTag: 'uniq-66-'
};

var processors = [];
var processor1 = {

};
var processor2 = {

};
processors.push(processor1);
processors.push(processor2); */

describe('Vuex Store', () => {
  describe('Mutations', () => {
    var sandbox;
    before(function () {
      var fromState = function (state) {
        var coolStuff = {
          sync: function (objects) {
            //  console.log(objects);
          },
          find: function (query, id) {
            if (query === 'users') {
              return {id: '1'};
            }
            if (query === 'processors') {
              return {id: '1'};
            }
            if (query === 'reports') {
              return {id: '1'};
            }
            if (query === 'dataResources') {
              return {id: '1'};
            }
            if (query === 'profiles') {
              return {id: '1'};
            }
          },
          findAll: function (query) {
            if (query === 'users') {
              return [];
            }
            if (query === 'dataResources') {
              return [];
            }
          }
        };
        return coolStuff;
      };
      sandbox = sinon.sandbox.create();
      sandbox.stub(API, 'fromState').callsFake(fromState);
    });
    after(function () {
      sandbox.restore();
    });
    it('Set Profiles', () => {
      var profiles = [];
      store.commit(m.SET_PROFILES, profiles);
    });
    it('Set Reports', () => {
      var reports = [];
      store.commit(m.SET_REPORTS, reports);
    });
    it('Set Processors', () => {
      var processors = [];
      store.commit(m.SET_PROCESSORS, processors);
    });
    it('Set Users', () => {
      var users = [];
      store.commit(m.SET_USERS, users);
    });
    it('Set current User', () => {
      var user = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_CURRENT_USER, user);
      expect(store.state.currentUser).to.have.property('id');
    });
    it('Set logged in user', () => {
      var user = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_LOGGED_IN_USER, user);
      expect(store.state.loggedInUser).to.have.property('id');
    });
    it('Set current Processor', () => {
      var processor = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_CURRENT_PROCESSOR, processor);
      expect(store.state.currentProcessor).to.have.property('id');
    });
    it('Set current Report', () => {
      var report = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_CURRENT_REPORT, report);
      expect(store.state.currentReport).to.have.property('id');
    });
    it('Set current Data Resource', () => {
      var dataResource = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_CURRENT_DATA_RESOURCE, dataResource);
      expect(store.state.currentDataResource).to.have.property('id');
    });
    it('Set current profile', () => {
      var profile = {
        data: {
          id: '1'
        }
      };
      store.commit(m.SET_CURRENT_PROFILE, profile);
      expect(store.state.currentProfile).to.have.property('id');
    });
    it('Reset Profiles', () => {
      store.commit(m.RESET_PROFILES);
    });
    it('Reset Reports', () => {
      store.state.repository.reports = {name: 'emptyObject'};
      store.commit(m.RESET_REPORTS);
      expect(store.state.repository.reports).to.be.empty;
    });
    it('Reset Processors', () => {
      store.state.repository.processors = {name: 'emptyObject'};
      store.commit(m.RESET_PROCESSORS);
      expect(store.state.repository.processors).to.be.empty;
    });
    it('Reset Users', () => {
      store.state.repository.users = {name: 'emptyObject'};
      store.commit(m.RESET_USERS);
      expect(store.state.repository.users).to.be.empty;
    });
    it('Reset Data Resources', () => {
      store.state.repository.dataResources = {name: 'emptyObject'};
      store.commit(m.RESET_DATA_RESOURCES);
      expect(store.state.repository.dataResources).to.be.empty;
    });
    it('unset current profile', () => {
      store.state.currentProfile = {name: 'profileName'};
      store.commit(m.UNSET_CURRENT_PROFILE);
      expect(store.state.currentProfile).to.equal(null);
      ;
    });
    it('unset current report', () => {
      store.state.currentReport = {name: 'reportName'};
      store.commit(m.UNSET_CURRENT_REPORT);
      expect(store.state.currentReport).to.equal(null);
      ;
    });
    it('unset current processor', () => {
      store.state.currentProcessor = {name: 'processorName'};
      store.commit(m.UNSET_CURRENT_PROCESSOR);
      expect(store.state.currentProcessor).to.equal(null);
      ;
    });
    it('unset current data Resource', () => {
      store.state.currentDataResource = {name: 'resourceName'};
      store.commit(m.UNSET_CURRENT_DATA_RESOURCE);
      expect(store.state.currentDataResource).to.equal(null);
      ;
    });
    it('unset current user', () => {
      store.state.currentUser = {name: 'userObject'};
      store.commit(m.UNSET_CURRENT_USER);
      expect(store.state.currentUser).to.equal(null);
      ;
    });
    it('unset current logged in user', () => {
      store.state.loggedInUser = {name: 'resourceName'};
      store.commit(m.UNSET_LOGGED_IN_USER);
      expect(store.state.loggedInUser).to.equal(null);
    });
    it('set data resource filters', () => {
      var dataFilter = {name: 'dataFilter'};
      store.commit(m.SET_DATA_RESOURCES_FILTERS, dataFilter);
      expect(store.state.filtersDataResources).to.equal(dataFilter);
    });
    it('set page data resources', () => {
      var pageDataResource = {name: 'pageDataResource'};
      store.commit(m.SET_DATA_RESOURCES_PAGE, pageDataResource);
      expect(store.state.pageDataResources).to.equal(pageDataResource);
    });
    it('set data resource sort', () => {
      var sortDataResource = {name: 'sortDataResource'};
      store.commit(m.SET_DATA_RESOURCES_SORT, sortDataResource);
      expect(store.state.sortDataResources).to.equal(sortDataResource);
    });
    it('set data resource order', () => {
      var orderDataResource = {name: 'sortDataResource'};
      store.commit(m.SET_DATA_RESOURCES_ORDER, orderDataResource);
      expect(store.state.orderDataResources).to.equal(orderDataResource);
    });
    it('Append data resources', () => {
      var dataResources = [];
      store.commit(m.APPEND_DATA_RESOURCES, dataResources);
      expect(store.state.dataResources.length).to.equal(0);
    });
    it('add data resource page request', () => {
      store.commit(m.ADD_DATA_RESOURCE_PAGE_REQUEST, 1);
      expect(store.state.pagesRequestedDataResources.length).to.equal(1);
    });
    it('set data resources refresh requested', () => {
      store.commit(m.SET_DATA_RESOURCES_REFRESH_REQUESTED);
      expect(store.state.refreshRequestedDataResources).to.equal(true);
    });
  });
  describe('Actions', () => {
    var sandbox;
    var server = null;
    var dataResource = null;
    var processor = null;
    beforeEach(function () {
      dataResource = {};
      processor = {};

      server = sinon.fakeServer.create();
      var fromState = function (state) {
        var coolStuff = {
          sync: function (objects) {
            console.log('This is sync');
          },
          find: function (query, id) {
            console.log('find ' + query);
            if (query === 'users') {
              return {id: '1'};
            }
            if (query === 'processors') {
              return {id: '1'};
            }
            if (query === 'reports') {
              return {id: '1'};
            }
            if (query === 'dataResources') {
              return {id: '1'};
            }
            if (query === 'profiles') {
              return {id: '1'};
            }
          },
          findAll: function (query) {
            if (query === 'users') {
              return [];
            }
            if (query === 'dataResources') {
              return [];
            }
          }
        };
        return coolStuff;
      };
      sandbox = sinon.sandbox.create();
      sandbox.stub(API, 'fromState').callsFake(fromState);
    });

    afterEach(function () {
      server.restore();
      sandbox.restore();
      dataResource = null;
      processor = null;
    });
    it('store settings profile id for data resource', (done) => {
      var resources = [
        { id: 1, providerId: 2, url: 'http://opendata.gov/filename.csv', filetype: 'csv' }
      ];
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('POST', '/dataResources/settings', okResponse);
      var commit = sinon.spy();
      var dispatch = sinon.spy();
      var profileId = '3';
      actions.STORE_SETTING_PROFILE_ID_FOR_DATA_RESOURCES({commit, dispatch}, {profileId, resources}).then(() => {
        commit.should.have.been.calledWith(m.SET_DATA_RESOURCES_PAGE);
        dispatch.should.have.been.calledWith(a.LOAD_DATA_RESOURCES);
        done();
      });
      server.respond();
    });

    it('Save data resource', (done) => {
      var resource = { id: 1, providerId: 2, url: 'http://opendata.gov/filename.csv', filetype: 'csv' };
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('PUT', '/dataResources/1', okResponse);
      var commit = sinon.spy();
      actions[a.SAVE_DATA_RESOURCE]({commit}, resource).then(() => {
        commit.should.have.been.calledWith(m.SET_CURRENT_DATA_RESOURCE);
        done();
      });
      server.respond();
    });
    it('delete data resource', (done) => {
      var resource = { id: '1', providerId: '2', url: 'http://opendata.gov/filename.csv', filetype: 'csv' };
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('DELETE', '/dataResources/1', okResponse);
      var commit = sinon.spy();
      actions[a.DELETE_DATA_RESOURCE]({commit}, resource).then(() => {
        commit.should.have.been.calledWith(m.UNSET_CURRENT_DATA_RESOURCE);
        done();
      });
      server.respond();
    });
    it('Load profile', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/profiles/1?include=configurations.processor', okResponse);
      var commit = sinon.spy();
      var profileId = '1';
      actions[a.LOAD_PROFILE]({commit}, profileId).then(() => {
        commit.should.have.been.calledWith(m.SET_CURRENT_PROFILE);
        done();
      });
    });
    it('Load users', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '[{"name": "muto"},{"name": "muto2"}]'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/users/', okResponse);
      store.dispatch(a.LOAD_USERS).then(() => {
        expect(store.state.repository.users).to.eql({});
        done();
      });
      server.respond();
    });
    it('Load user', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '{ "data": { "id": "1", "name": "muto" }}'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/users/1', okResponse);
      store.dispatch(a.LOAD_USER, 1).then(() => {
        expect(store.state.currentUser).to.have.property('id');
        done();
      });
      server.respond();
    });
    it('Load profiles', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '[{"name": "muto"},{"name": "muto2"}]'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/profiles/', okResponse);
      store.dispatch(a.LOAD_PROFILES).then(() => {
        expect(store.state.repository.profiles).to.eql({});

        done();
      });
      server.respond();
    });
    it('Load Processors', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '[{"name": "muto"},{"name": "muto2"}]'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/processors/', okResponse);
      store.dispatch(a.LOAD_PROCESSORS).then(() => {
        expect(store.state.repository.processors).to.eql({});
        done();
      });
      server.respond();
    });
    it('Load reports', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '[{"name": "muto"},{"name": "muto2"}]'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/reports/', okResponse);
      store.dispatch(a.LOAD_REPORTS).then(() => {
        expect(store.state.repository.reports).to.eql({});
        done();
      });
      server.respond();
    });
    it('Load report', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '{ "data": { "id": "1", "name": "reportName" }}'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/reports/1?include=dataResource,profile', okResponse);
      store.dispatch(a.LOAD_REPORT, 1).then(() => {
        expect(store.state.currentReport).to.have.property('id');
        done();
      });
      server.respond();
    });
    it('Store processor', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('POST', '/processors', okResponse);
      store.dispatch(a.STORE_PROCESSOR, processor).then(() => {
        done();
      });
      server.respond();
    });
    it('Store data resource', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        ''
      ];
      server.autoRespond = true;
      server.respondWith('POST', '/dataResources', okResponse);
      store.dispatch(a.STORE_DATA_RESOURCE, dataResource).then(() => {
        done();
      });
      server.respond();
    });
    it('Load logged in user', (done) => {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '{ "data": { "id": "1"} }'
      ];
      server.autoRespond = true;
      server.respondWith('GET', '/users/me', okResponse);
      store.dispatch(a.LOAD_LOGGED_IN_USER).then(() => {
        expect(store.state.loggedInUser).to.have.property('id');
        done();
      });
      server.respond();
    });

    /// new way
    it('Update data resource filters', () => {
      var filters = {
        created_at: '2018-03-03',
        source: 'ckan',
        filetype: 'csv',
        search: 'qwer'
      };
      const state = {
        filtersDataResources: {}
      };
      var commit = sinon.spy();
      var dispatch = sinon.spy();
      actions[a.UPDATE_DATA_RESOURCES_FILTERS]({commit, dispatch, state}, {filters});
      commit.should.have.been.calledTwice;
      dispatch.should.have.been.calledWith(a.LOAD_DATA_RESOURCES);
    });
    it('Update data resource page', () => {
      const state = {
        pageDataResources: '1'
      };
      var commit = sinon.spy();
      var dispatch = sinon.spy();
      actions[a.UPDATE_DATA_RESOURCES_PAGE]({commit, dispatch, state}, {page: '1'});
      commit.should.have.been.called;
      dispatch.should.have.been.calledWith(a.LOAD_DATA_RESOURCES);
    });
    it('Update data resource order', () => {
      const state = {
        orderDataResources: 'desc'
      };
      var commit = sinon.spy();
      var dispatch = sinon.spy();
      actions[a.UPDATE_DATA_RESOURCES_ORDER]({commit, dispatch, state}, {order: 'asc'});
      commit.should.have.been.calledTwice;
      dispatch.should.have.been.calledWith(a.LOAD_DATA_RESOURCES);
    });
    it('Update data resource sort', () => {
      const state = {
        sortDataResources: 'filename'
      };
      var commit = sinon.spy();
      var dispatch = sinon.spy();
      actions[a.UPDATE_DATA_RESOURCES_SORT]({commit, dispatch, state}, {sort: 'filetype'});
      commit.should.have.been.calledTwice;
      dispatch.should.have.been.calledWith(a.LOAD_DATA_RESOURCES);
    });
  });
  describe('getters', () => {
    var sandbox;
    var server = null;
    beforeEach(function () {
      server = sinon.fakeServer.create();
      var fromState = function (state) {
        var coolStuff = {
          sync: function (objects) {
            console.log('This is sync');
          },
          find: function (query, id) {
            console.log('find');
            if (query === 'users') {
              return {id: '1'};
            }
            if (query === 'processors') {
              return {id: '1'};
            }
            if (query === 'reports') {
              return {id: '1'};
            }
            if (query === 'dataResources') {
              return {id: '1'};
            }
            if (query === 'profiles') {
              return {id: '1'};
            }
          },
          findAll: function (query) {
            if (query === 'users') {
              return [{name: 'user'}, {name: 'user'}];
            }
            if (query === 'dataResources') {
              return [{name: 'resource'}, {name: 'resource'}];
            }
            if (query === 'reports') {
              return [{name: 'report'}, {name: 'report'}];
            }
            if (query === 'profiles') {
              return [{name: 'profile'}, {name: 'profile'}];
            }
            if (query === 'processors') {
              return [{name: 'processor'}, {name: 'processor'}];
            }
          }
        };
        return coolStuff;
      };
      sandbox = sinon.sandbox.create();
      sandbox.stub(API, 'fromState').callsFake(fromState);
    });

    afterEach(function () {
      server.restore();
      sandbox.restore();
    });
    it('users getters', () => {
      expect(store.getters.users.length).to.equal(2);
    });
    it('reports getters', () => {
      expect(store.getters.reports.length).to.equal(2);
    });
    it('processors getters', () => {
      expect(store.getters.processors.length).to.equal(2);
    });
    it('profiles getters', () => {
      expect(store.getters.profiles.length).to.equal(2);
    });
    xit('dataResourcePageCount getters', () => {
      expect(store.getters.dataResourcePageCount.length).to.equal(2);
    });
    xit('data resources getters', () => {
      expect(store.getters.dataresources.length).to.equal(2);
    });
  });
});
