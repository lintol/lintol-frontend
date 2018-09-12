import Vue from 'vue';
import ProcessorRow from '@/components/processors/ProcessorRow';

describe('ProcessorRow.vue', () => {
  it('Data is a function', () => {
    expect(ProcessorRow.data).to.be.a('function');
  });
  it('test converted time', () => {
    expect(ProcessorRow.methods.convertDate('2001-01-01 00:00:00')).to.equal('1st Jan 2001');
    expect(ProcessorRow.name).to.equal('ProcessorRow');
  });
  it('Populate details', () => {
    var processor = {
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
    const Constructor = Vue.extend(ProcessorRow);
    const vm = new Constructor({
      propsData: {
        processor: processor
      }
    }).$mount();
    expect(vm.$el.querySelector('label').textContent).to.equal('CSV processor');
    expect(vm.$el.querySelector('p').textContent).to.equal('CSV');
    expect(vm.$el.querySelector('.processorRow div:nth-child(2) label:nth-child(2)').textContent).to.equal('1st Jan 2001');
    expect(vm.$el.querySelector('.processorRow div:nth-child(3) label:nth-child(2)').textContent).to.equal('1st Jan 2001');
    expect(vm.$el.querySelector('.processorRow div:nth-child(4) label:nth-child(2)').textContent).to.equal('processor-taggy');
  });
});
