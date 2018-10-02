import Vuex from 'vuex';
import ResourceTable from '@/components/resources/ResourceTable';
import { shallow, createLocalVue } from '@vue/test-utils';
import * as a from '@/state/action-types';

const localVue = createLocalVue();
localVue.use(Vuex);

var resources = [];
var resource1 = {
  url: 'www.here.com',
  filename: 'waste-stats.csv',
  status: 'new resource',
  source: 'ckan',
  filetype: 'csv',
  user: 'mary',
  created_at: {
    date: '2018-01-01'
  }
};
var resource2 = {
  url: 'www.here.com',
  filename: 'waste-stats.json',
  status: 'new resource',
  source: 'ckan',
  filetype: 'JSON',
  user: 'mary',
  created_at: {
    date: '2018-01-01'
  }
};
resources.push(resource1);
resources.push(resource2);
let store = new Vuex.Store({
  state: {
    dateResources: resources
  },
  getters: {
    dataResources: state => {
      return resources;
    },
    loggedInUser: state => {
      return {
        'name': 'mary',
        'driver': 'ckan'
      };
    }
  },
  actions: {
    [a.UPDATE_DATA_RESOURCES_PAGE] ({ commit }) {
    },
    [a.DELETE_DATA_RESOURCE] ({ commit }) {
    },
  }
});

describe('ResourceTable.vue', () => {
  const wrapper = shallow(ResourceTable, { store, localVue });
  it('Data is a function', () => {
    expect(ResourceTable.data).to.be.a('function');
  });
  it('Get all resources ', () => {
    expect(wrapper.vm.resources.length).to.equal(2);
  });
  xit('Run Profile Action', () => {
    wrapper.vm.selectedResource(resource1);
    var e = {
      target: {
        value: 'runProfile'
      }
    };
    wrapper.vm.resourceAction(e);
  });
  it('Archive Action', () => {
    var e = {
      target: {
        value: 'archive'
      }
    };
    wrapper.vm.selectedResource(resource1);
    wrapper.vm.resourceAction(e);
    expect(wrapper.vm.selectedResources[0].archived).to.equal('1');
    wrapper.vm.selectedResource(resource1);
  });
  xit('Delete Action', () => {
    wrapper.vm.selectedResource(resource1);
    var e = {
      target: {
        value: 'delete'
      }
    };
    sinon.stub(confirm).return(true);
    wrapper.vm.selectedResource(resource1);
    wrapper.vm.resourceAction(e);
  });
  it('Resources dateList', () => {
    expect(wrapper.vm.dateList.length).to.equal(1);
  });
  it('Resources filter by source option', () => {
    expect(wrapper.vm.filterBySourceOptions).to.have.property('');
  });
  it('Resources filter by type option', () => {
    expect(wrapper.vm.filterByTypeOptions).to.have.property('geojson');
    expect(wrapper.vm.filterByTypeOptions).to.have.property('csv');
    expect(wrapper.vm.filterByTypeOptions).to.have.property('');
  });
  it('Resources computed filters', () => {
    wrapper.vm.selectedType = 'json';
    wrapper.vm.selectedSource = 'ckan';
    wrapper.vm.selectedDate = '2018-03-03';
    wrapper.vm.search = 'here';
    expect(wrapper.vm.filters.filetype).to.equal('json');
    expect(wrapper.vm.filters.source).to.equal('ckan');
    expect(wrapper.vm.filters.created_at).to.equal('2018-03-03');
    expect(wrapper.vm.filters.search).to.equal('here');
  });
  it('Resources revert to descending', () => {
    wrapper.vm.ascDesc = 'asc';
    wrapper.vm.revertAscDesc();
    expect(wrapper.vm.ascDesc).to.equal('desc');
  });
  it('Resources revert to ascending', () => {
    wrapper.vm.ascDesc = 'desc';
    wrapper.vm.revertAscDesc();
    expect(wrapper.vm.ascDesc).to.equal('asc');
  });
  it('Selected Resource ', () => {
    wrapper.vm.selectedResource(resource2);
    expect(wrapper.vm.selectedResources.length).to.equal(1);
    wrapper.vm.selectedResource(resource2);
    expect(wrapper.vm.selectedResources.length).to.equal(0);
  });
  it('Resources sortBy', () => {
    wrapper.vm.sort('status');
    expect(wrapper.vm.sortBy).to.equal('status');
  });
  it('Resources matchDataResourcesToProfile', () => {
    wrapper.vm.matchDataResourcesToProfile('status');
    expect(wrapper.vm.selectedResources).to.eql([]);
  });
  it('addResourceAction', () => {
    wrapper.vm.addResourceAction('status');
  });
  it('resourceAction delete', () => {
    wrapper.vm.resourceAction({target: {value: 'delete'}});
  });
/*  it('resourceAction runProfile', () => {
    wrapper.vm.resourceAction({target: {value: 'runProfile'}});
  }); */
  it('getResources', async () => {
    wrapper.vm.getResources(1);
  });
  it('delete', async () => {
    wrapper.vm.delete(true);
  });
  /* it('filterBySourceOptions', () => {
    wrapper.vm.$store.dispatch(LOAD_USER);
    wrapper.vm.filterBySourceOptions();
  }); */
});
