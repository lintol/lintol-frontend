import Vuex from 'vuex';
import Vue from 'vue';
import EditProfile from '@/components/profiles/EditProfile';

Vue.use(Vuex);

describe('EditProfile.vue', () => {
  /* let profile = { name: 'des', description: 'cool des' };
  let store = new Vuex.Store({
    profile
  }); */
  it('Data is a function', () => {
    expect(EditProfile.data).to.be.a('function');
  });
  /* it('Title is set', () => {
    expect(EditProfile.data).to.be.a('function');
    const Constructor = Vue.extend(EditProfile);
    const vm = new Constructor({
      store,
      propsData: {
        profileId: '1234567'
      }
    }).$mount();
    console.log('el');
    console.log(vm.$el);
    expect(vm.$el.querySelector('#editProfilePanel h1').textContent)
      .to.equal('Edit Profile');
  }); */
});
