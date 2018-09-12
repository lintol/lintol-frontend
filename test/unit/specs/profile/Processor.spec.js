import Vue from 'vue';
import ProcessorConfiguration from '@/components/profiles/ProcessorConfiguration';

describe('ProcessorConfiguration.vue', () => {
  it('Data is a function', () => {
    expect(ProcessorConfiguration.data).to.be.a('function');
  });
  it('Populate details', () => {
    const Constructor = Vue.extend(ProcessorConfiguration);
    const vm = new Constructor({
      propsData: {
        configuration: {
          processor: {
            name: 'csv',
            description: 'csv linter'
          }
        }
      }
    }).$mount();
    expect(vm.$el.querySelector('#processorTitle').textContent).to.equal('csv');
    expect(vm.$el.querySelector('#processorDescription').textContent).to.equal('csv linter');
  });
});
