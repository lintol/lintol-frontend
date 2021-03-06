// import Vue from 'vue';
import Vuex from 'vuex';
import ProcessorTable from '@/components/processors/ProcessorTable';
import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

var processors = [];
var processor1 = {
  name: 'CSV processor',
  description: 'CSV',
  created_at: {
    date: '2001-01-01 00:00:00'
  },
  updated_at: {
    date: '2001-01-01 00:00:00'
  },
  uniqueTag: 'processor-taggy'
};
var processor2 = {
  name: 'JSON processor',
  description: 'JSON',
  created_at: {
    date: '2001-01-01 00:00:00'
  },
  updated_at: {
    date: '2001-01-01 00:00:00'
  },
  uniqueTag: 'processor-taggy'
};
processors.push(processor1);
processors.push(processor2);
let store = new Vuex.Store({
  state: {
    processors: processors
  },
  getters: {
    processors: state => {
      return processors;
    }
  }
});

describe('ProcessorTable.vue', () => {
  const wrapper = shallow(ProcessorTable, { store, localVue, router });
  it('Data is a function', () => {
    expect(ProcessorTable.data).to.be.a('function');
  });
  it('Get all processors ', () => {
    expect(wrapper.vm.processors.length).to.equal(2);
  });
  it('Get processors by search', () => {
    wrapper.vm.search = 'JSON';
    expect(wrapper.vm.filteredProcessors.length).to.equal(1);
  });
  it('Add processor', () => {
    wrapper.vm.addProcessor();
  });
});
