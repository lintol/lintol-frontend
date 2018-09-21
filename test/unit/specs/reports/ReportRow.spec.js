// import Vue from 'vue';
import ReportRow from '@/components/reports/ReportRow';
import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ReportRow.vue', () => {
  it('Data is a function', () => {
    expect(ReportRow.data).to.be.a('function');
  });
  it('test converted time', () => {
    expect(ReportRow.name).to.equal('ReportRow');
  });
  it('View report', () => {
    var report = {
      name: 'CSV report',
      created_at: '2001-01-01 00:00:00',
      user: 'Jay',
      errors: 8,
      warnings: 9,
      passes: 10,
      qualityScore: 76
    };
    const wrapper = shallow(ReportRow, {
      propsData: {
        report: report
      },
      localVue,
      router
    });
    wrapper.vm.viewReport('1');
  });
  /* it('Populate Row', () => {
    var report = {
      name: 'CSV report',
      created_at: '2001-01-01 00:00:00',
      user: 'Jay',
      errors: 8,
      warnings: 9,
      passes: 10,
      qualityScore: 76
    };
    const Constructor = Vue.extend(ReportRow);
    const vm = new Constructor({
      propsData: {
        report: report
      }
    }).$mount();
    expect(vm.$el.querySelector('p').textContent).to.equal('CSV report');
    expect(vm.$el.querySelector('.reportRow div:nth-child(2) label:nth-child(2)').textContent).to.equal('1st January 2001');
    expect(vm.$el.querySelector('.reportRow div:nth-child(3) p').textContent).to.equal(' Jay');
    expect(vm.$el.querySelector('.reportRow div:nth-child(4) div label').textContent).to.equal('8');
    expect(vm.$el.querySelector('.reportRow div:nth-child(4) div:nth-child(2) label').textContent).to.equal('9');
    expect(vm.$el.querySelector('.reportRow div:nth-child(4) div:nth-child(3) label').textContent).to.equal('10');
    expect(vm.$el.querySelector('.reportRow div:nth-child(5) label').textContent).to.equal('76');
  }); */
});
