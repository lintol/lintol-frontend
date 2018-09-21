import Vue from 'vue';
import Vuex from 'vuex';
import ResourceRow from '@/components/resources/ResourceRow';
import { mount } from '@vue/test-utils';

Vue.use(Vuex);
var resource = {
  url: 'www.here.com',
  filename: 'waste-stats.csv',
  status: 'new resource',
  source: 'ckan',
  filetype: 'csv',
  user: {
    name: 'mary'
  },
  created_at: {
    date: '2018-01-01'
  }
};
describe('ResourceRow.vue', () => {
  const wrapper = mount(ResourceRow, {
    propsData: {
      resource: resource,
      index: '1',
      clearSelected: false
    }
  });
  it('Resource status to be newStatus ', () => {
    expect(wrapper.vm.statusColor).to.equal('newStatus');
  });
  it('Resource status to be runStatus', () => {
    wrapper.vm.resource.status = 'report run';
<<<<<<< HEAD
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('runStatus');
    });
  });
  it('Resource status to be  archivedStatus', () => {
    wrapper.vm.resource.status = 'archived';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('archivedStatus');
    });
  });
  it('Resource status to be validLinkStatus ', () => {
    wrapper.vm.resource.status = 'valid link';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('validLinkStatus');
    });
  });
  it('Resource status to be  invalidLinkStatus', () => {
    wrapper.vm.resource.status = 'invalid link';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('invalidLinkStatus');
    });
  });
  it('Resource status to be  invalidStatus', () => {
    wrapper.vm.resource.status = '';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('invalidStatus');
    });
=======
    expect(wrapper.vm.statusColor).to.equal('runStatus');
  });
  it('Resource status to be  archivedStatus', () => {
    wrapper.vm.resource.status = 'archived';
    expect(wrapper.vm.statusColor).to.equal('archivedStatus');
  });
  it('Resource status to be validLinkStatus ', () => {
    wrapper.vm.resource.status = 'valid link';
    expect(wrapper.vm.statusColor).to.equal('validLinkStatus');
  });
  it('Resource status to be  invalidLinkStatus', () => {
    wrapper.vm.resource.status = 'invalid link';
    expect(wrapper.vm.statusColor).to.equal('invalidLinkStatus');
  });
  it('Resource status to be  invalidStatus', () => {
    wrapper.vm.resource.status = '';
    expect(wrapper.vm.statusColor).to.equal('invalidStatus');
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
  });
  it('watch cleared selected', () => {
    wrapper.vm.isResourceSelected = true;
    wrapper.vm.clearSelected = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isResourceSelected).to.equal(false);
    });
  });
  it('Emit resource selected ', () => {
    wrapper.vm.isResourceSelected = false;
    wrapper.vm.resourceSelected();
    expect(wrapper.emitted()).to.have.property('resourceSelected');
    expect(wrapper.emitted().resourceSelected[0].length).to.equal(2); // it returns an array inside an array
    expect(wrapper.vm.isResourceSelected).to.equal(true);
  });
<<<<<<< HEAD
  it('viewResource', () => {
    wrapper.vm.viewResource(null);
    });
=======
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
});
