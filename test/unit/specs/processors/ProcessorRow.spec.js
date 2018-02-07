import Vue from 'vue';
import router from '@/router';
import VueRouter from 'vue-router';
import ProcessorRow from '@/components/processors/ProcessorRow';

describe('ProcessorRow.vue', () => {
  // Nice little helper to return our component within a div
  const getComponent = (propsData, data) => {
    const Constructor = Vue.extend(ProcessorRow);

    return new Constructor({
      router,
      propsData,
      data
    }).$mount();
  };

  describe('Component', () => {
    const defaultData = ProcessorRow.data();

    it('should have a property "name"', () => expect(ProcessorRow.name).to.be.a('string'));

    it('should have a property "name" set to "ProcessorRow"', () => expect(ProcessorRow.name).to.equal('ProcessorRow'));

    it('should have a data hook', () => expect(ProcessorRow.data).to.be.a('function'));

    it('should have a default "configurations" set to "32"', () => expect(defaultData.configurations).to.equal(32));

    it('should correctly convert "2001-01-01 00:00:00" to "1st January 2001"', () => expect(ProcessorRow.methods.convertDate('2001-01-01 00:00:00')).to.equal('1st January 2001'));
  });

  describe('Template', () => {
    Vue.use(VueRouter);

    const propsData = {
      'processor': {
        'name': 'CSV processor',
        'description': 'CSV',
        'created_at': '2001-01-01 00:00:00',
        'updated_at': '2001-01-01 00:00:00',
        'uniqueTag': 'processor-taggy'
      }
    };

    const data = {
      'configurations': 16
    };

    const component = getComponent(propsData, data);

    it('should render correctly', () => expect(component.$el));

    it('should have a "div" element', () => expect(component.$el.querySelector('div').length));

    it('should have a "div" element with an "id" set to "processors-row"', () => expect(component.$el.id).to.equal('processors-row'));

    it('should have a "div" element with an "className" set to "shadedRow"', () => expect(component.$el.className).to.equal('shadedRow'));

    it('should have a element with a "className" set to "description"', () => expect(component.$el.querySelector('.description').length));

    it('should correctly populate a processor row"', () => {
      expect(component.$el.querySelector('.mainColumnHeader').textContent).to.equal('CSV processor');
      expect(component.$el.querySelector('.description').textContent).to.equal('CSV');
      expect(component.$el.querySelector('.processorRow div:nth-child(2) label:nth-child(2)').textContent).to.equal('1st January 2001');
      expect(component.$el.querySelector('.processorRow div:nth-child(3) label:nth-child(2)').textContent).to.equal('1st January 2001');
      expect(component.$el.querySelector('.processorRow div:nth-child(4) label:nth-child(2)').textContent).to.equal('processor-taggy');
      expect(component.$el.querySelector('.processorRow div:nth-child(5) label:nth-child(1)').textContent).to.equal('16');
    });
  });
});
