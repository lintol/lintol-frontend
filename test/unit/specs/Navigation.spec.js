import Vue from 'vue';
import router from '@/router';
import VueRouter from 'vue-router';
import Navigation from '@/components/Navigation';

describe('Navigation.vue', () => {
  // Nice little helper to return our component within a div
  const getComponent = () => {
    const Constructor = Vue.extend(Navigation);

    return new Constructor({
      router
    }).$mount();
  };

  describe('Component', () => {
    const defaultData = Navigation.data();

    it('should have a property "name"', () => expect(Navigation.name).to.be.a('string'));

    it('should have a property "name" set to "Navigation"', () => expect(Navigation.name).to.equal('Navigation'));

    it('should have a data hook', () => expect(Navigation.data).to.be.a('function'));

    it('should have a default "currentView" set to "profileTable"', () => expect(defaultData.currentView).to.equal('profileTable'));

    it('should have a default "version" set to "0.5"', () => expect(defaultData.version).to.equal(0.5));

    it('should have a default "user" set to "Bob Barker"', () => expect(defaultData.user).to.equal('Bob Barker'));
  });

  describe('Template', () => {
    Vue.use(VueRouter);

    const component = getComponent();

    it('should render correctly', () => expect(component.$el));

    it('should have a "div" element', () => expect(component.$el.querySelector('div').length));

    it('should have a element with a "className" set to "version"', () => expect(component.$el.querySelector('.version').length));

    it('should have a element with a "className" set to "activityBanner"', () => expect(component.$el.querySelector('.activityBanner').length));

    it('should have a "label "element"', () => expect(component.$el.querySelector('label').length));

    it('should have an element with text set to "Bob Barker"', () => expect(component.$el.textContent).to.contain('Bob Barker'));

    it('should have a "nav" element', () => expect(component.$el.querySelector('nav').length));

    it('should have a "ul" element with 6 "li" elements', () => {
      expect(component.$el.querySelector('ul').length);
      expect(component.$el.querySelectorAll('li').length).to.equal(6);
    });
  });
});
