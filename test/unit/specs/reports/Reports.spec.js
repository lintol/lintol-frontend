import Vuex from 'vuex';
import Reports from '@/components/reports/Reports';
import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Reports.vue', () => {
  it('Data is a function', () => {
    expect(Reports.data).to.be.a('function');
  });
});
