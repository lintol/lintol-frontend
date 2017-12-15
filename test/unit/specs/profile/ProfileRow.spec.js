import Vue from 'vue';
import ProfileRow from '@/components/profiles/ProfileRow';

describe('ProfileRow.vue', () => {
  it('Data is a function', () => {
    expect(ProfileRow.data).to.be.a('function');
  });
  it('Populate details', () => {
    var profile = {
      name: 'Waste Profile',
      creator: 'Jay',
      description: 'Waste Data',
      created_at: '2001-01-01 00:00:00',
      updated_at: '2001-01-01 00:00:00',
      version: '2',
      uniqueTag: 'waste-taggy'
    };
    const Constructor = Vue.extend(ProfileRow);
    const vm = new Constructor({
      propsData: {
        profile: profile
      }
    }).$mount();
    expect(vm.$el.querySelector('label').textContent).to.equal('Waste Profile by  Jay ');
    expect(vm.$el.querySelector('p').textContent).to.equal('Waste Data ');
    expect(vm.$el.querySelector('.profileRow div:nth-child(2) p').textContent).to.equal('1st January 2001');
    expect(vm.$el.querySelector('.profileRow div:nth-child(3) p').textContent).to.equal('1st January 2001');
    expect(vm.$el.querySelector('.profileRow div:nth-child(4) p').textContent).to.equal('2');
    expect(vm.$el.querySelector('.profileRow div:nth-child(5) p').textContent).to.equal('waste-taggy');
  });
});
