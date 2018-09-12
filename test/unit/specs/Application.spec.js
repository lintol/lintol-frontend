import Vue from 'vue';
import router from '@/router';
import VueRouter from 'vue-router';
import Application from '@/components/Application';

describe('Application.vue', () => {
  // Nice little helper to return our component within a div
  const getComponent = () => {
    const Constructor = Vue.extend(Application);

    return new Constructor({
      router
    }).$mount();
  };

  describe('Component', () => {
    it('should have a property "name"', () => expect(Application.name).to.be.a('string'));

    it('should have a property "name" set to "Application"', () => expect(Application.name).to.equal('Application'));

    it('should have a data hook', () => expect(Application.data).to.be.a('function'));
  });

  describe('Template', () => {
    Vue.use(VueRouter);

    it('should mount correctly', () => {
      const component = getComponent();

      expect(component.$el);
    });

    it('should have a "div" element', () => {
      const component = getComponent();

      expect(component.$el.querySelector('div').length);
    });

    it('should have a "div" element with a "className" set to "app"', () => {
      const component = getComponent();

      expect(component.$el.className).to.equal('app');
    });
  });
});
