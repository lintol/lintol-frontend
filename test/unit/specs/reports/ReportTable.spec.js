// import Vue from 'vue';
import Vuex from 'vuex';
import ReportTable from '@/components/reports/ReportTable';
import { shallow, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

var reports = [];
var report1 = {
  url: 'www.here.com',
  profile: 'wasteProfile',
  filename: 'waste-stats.csv',
  status: 'new report',
  source: 'ckan',
  filetype: 'csv',
  user: {
    name: 'mary'
  },
  createdAt: {
    date: '2018-01-01'
  }
};
var report2 = {
  url: 'www.here.com',
  profile: 'wasteProfile',
  filename: 'waste-stats.json',
  status: 'new report',
  source: 'ckan',
  filetype: 'JSON',
  user: {
    name: 'mary'
  },
  createdAt: {
    date: '2018-01-02'
  }
};
reports.push(report1);
reports.push(report2);
let store = new Vuex.Store({
  state: {
    datereports: reports
  },
  getters: {
    reports: state => {
      return reports;
    }
  }
});

describe('ReportTable.vue', () => {
  const wrapper = shallow(ReportTable, { store, localVue });
  it('Data is a function', () => {
    expect(ReportTable.data).to.be.a('function');
  });
  it('Report Table user list', () => {
    expect(wrapper.vm.userList.length).to.equal(2);
  });
  it('Report Table profile list', () => {
    expect(wrapper.vm.profileList.length).to.equal(1);
  });
  it('Report Table filtered report user', () => {
    wrapper.vm.selectedUser = 'mary';
    expect(wrapper.vm.filteredReports.length).to.equal(2);
  });
  it('Report Table filtered report profile', () => {
    wrapper.vm.selectedProfile = 'wasteProfile';
    expect(wrapper.vm.filteredReports.length).to.equal(2);
  });
  it('Report Table filtered report date', () => {
    wrapper.vm.selectedDate = '2nd Jan 2018';
    expect(wrapper.vm.filteredReports.length).to.equal(1);
  });
});