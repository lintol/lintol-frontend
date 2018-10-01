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
  it('Resource status to be newStatus ', async () => {
    expect(wrapper.vm.statusColor).to.equal('newStatus');
  });
  it('Resource status to be runStatus', async () => {
    wrapper.vm.resource.status = 'report run';
    wrapper.vm.statusColor;
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('runStatus');
    });
  });
  it('Resource status to be  archivedStatus', async () => {
    wrapper.vm.resource.status = 'archived';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('archivedStatus');
    });
  });
  it('Resource status to be validLinkStatus ', async () => {
    wrapper.vm.resource.status = 'valid link';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('validLinkStatus');
    });
  });
  it('Resource status to be  invalidLinkStatus', async () => {
    wrapper.vm.resource.status = 'invalid link';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('invalidLinkStatus');
    });
  });
  it('Resource status to be  invalidStatus', async () => {
    wrapper.vm.resource.status = '';
    Vue.nextTick(function () {
      expect(wrapper.vm.statusColor).to.equal('invalidStatus');
    });
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
  it('viewResource', () => {
    wrapper.vm.viewResource(null);
  });
});
