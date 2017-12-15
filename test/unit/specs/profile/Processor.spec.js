import Vue from 'vue';
import Processor from '@/components/profiles/Processor';

describe('Processor.vue', () => {
  it('Data is a function', () => {
    expect(Processor.data).to.be.a('function');
  });
  it('Populate details', () => {
    const Constructor = Vue.extend(Processor);
    const vm = new Constructor({
      propsData: {
        name: 'csv',
        description: 'csv linter'
      }
    }).$mount();
    expect(vm.$el.querySelector('#processorTitle').textContent).to.equal('csv');
    expect(vm.$el.querySelector('#processorDescription').textContent).to.equal('csv linter');
  });
});
