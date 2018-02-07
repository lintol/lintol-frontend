import Vue from 'vue';
import router from '@/router';
import VueRouter from 'vue-router';
import Processors from '@/components/processors/Processors';

describe('Processors.vue', () => {
  // Nice little helper to return our component within a div
  const getComponent = () => {
    const Constructor = Vue.extend(Processors);

    return new Constructor({
      router
    }).$mount();
  };

  describe('Component', () => {
    it('should have a property "name"', () => expect(Processors.name).to.be.a('string'));

    it('should have a property "name" set to "Processors"', () => expect(Processors.name).to.equal('Processors'));

    it('should have a data hook', () => expect(Processors.data).to.be.a('function'));
  });

  describe('Template', () => {
    Vue.use(VueRouter);

    const component = getComponent();

    it('should mount correctly', () => expect(component.$el));

    it('should have a "div" element', () => expect(component.$el.querySelector('div').length));

    it('should have a "div" element with an "id" set to "processorPanel"', () => expect(component.$el.id).to.equal('processorPanel'));
  });
});
