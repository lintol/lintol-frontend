import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import VueRouter from 'vue-router';
import Navigation from '@/components/Navigation';

describe('Navigation.vue', () => {
  // Nice little helper to return our component within a div
  const getComponent = () => {
    const Constructor = Vue.extend(Navigation);
    let store = new Vuex.Store({
    });

    return new Constructor({
      store,
      router
    }).$mount();
  };

  describe('Component', () => {
    it('should have a property "name"', () => expect(Navigation.name).to.be.a('string'));

    it('should have a property "name" set to "Navigation"', () => expect(Navigation.name).to.equal('Navigation'));

    it('should have a data hook', () => expect(Navigation.data).to.be.a('function'));

    it('should have a default "currentView" set to "profileTable"', () => {
      const defaultData = Navigation.data();

      expect(defaultData.currentView).to.equal('profileTable');
    });

    it('should have a default "version" set to "0.12"', () => {
      const defaultData = Navigation.data();

      expect(defaultData.version).to.equal('0.12');
    });
  });

  describe('Template', () => {
    Vue.use(VueRouter);

    it('should render correctly', () => {
      const component = getComponent();

      expect(component.$el);
    });

    it('should have a "div" element', () => {
      const component = getComponent();

      expect(component.$el.querySelector('div').length);
    });

    it('should have a element with a "className" set to "version"', () => {
      const component = getComponent();

      expect(component.$el.querySelector('.version').length);
    });

    it('should have a "label "element"', () => {
      const component = getComponent();

      expect(component.$el.querySelector('label').length);
    });

    it('should have a "b-nav" element', () => {
      const component = getComponent();

      expect(component.$el.querySelector('b-nav').length);
    });

    it('should have 6 "b-nav-item" elements', () => {
      const component = getComponent();

      expect(component.$el.querySelectorAll('b-nav-item').length).to.equal(6);
    });
  });
});
