import ProfileRow from '@/components/profiles/ProfileRow';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ProfileRow.vue', () => {
  it('Data is a function', () => {
    expect(ProfileRow.data).to.be.a('function');
  });
  it('Populate details', () => {
    var profile = {
      name: 'Waste Profile',
      creator: 'Jay',
      description: 'Waste Data',
      created_at: {
        date: '2001-01-01 00:00:00'
      },
      updated_at: {
        date: '2001-01-01 00:00:00'
      },
      version: '2',
      uniqueTag: 'waste-taggy'
    };
    const wrapper = shallowMount(ProfileRow, {
      propsData: {
        profile: profile
      },
      localVue,
      router
    });
    expect(wrapper.vm.$el.querySelector('label').textContent).to.equal(' Waste Profile ');
    expect(wrapper.vm.$el.querySelector('p').textContent).to.equal('Waste Data ');
    expect(wrapper.vm.$el.querySelector('.profileRow b-col:nth-child(3) p').textContent).to.equal('1st Jan 2001');
    expect(wrapper.vm.$el.querySelector('.profileRow b-col:nth-child(4) p').textContent).to.equal('1st Jan 2001');
    expect(wrapper.vm.$el.querySelector('.profileRow b-col:nth-child(5) p').textContent).to.equal('2');
    expect(wrapper.vm.$el.querySelector('.profileRow b-col:nth-child(6) p').textContent).to.equal('waste-taggy');
  });

  it('Profile action archive', () => {
    var profile = {
      name: 'Waste Profile',
      creator: 'Jay',
      description: 'Waste Data',
      created_at: {
        date: '2001-01-01 00:00:00'
      },
      updated_at: {
        date: '2001-01-01 00:00:00'
      },
      version: '2',
      uniqueTag: 'waste-taggy'
    };
    const wrapper = shallowMount(ProfileRow, {
      propsData: {
        profile: profile
      },
      localVue,
      router
    });
    wrapper.vm.profileAction({target: {value: 'archive'}});
  });
  it('Profile action edit', () => {
    var profile = {
      name: 'Waste Profile',
      creator: 'Jay',
      description: 'Waste Data',
      created_at: {
        date: '2001-01-01 00:00:00'
      },
      updated_at: {
        date: '2001-01-01 00:00:00'
      },
      version: '2',
      uniqueTag: 'waste-taggy'
    };
    const wrapper = shallowMount(ProfileRow, {
      propsData: {
        profile: profile
      },
      localVue,
      router
    });
    wrapper.vm.profileAction({target: {value: 'edit'}});
  });
  it('Profile action edit', () => {
    var profile = {
      name: 'Waste Profile',
      creator: 'Jay',
      description: 'Waste Data',
      created_at: {
        date: '2001-01-01 00:00:00'
      },
      updated_at: {
        date: '2001-01-01 00:00:00'
      },
      version: '2',
      uniqueTag: 'waste-taggy'
    };
    const wrapper = shallowMount(ProfileRow, {
      propsData: {
        profile: profile
      },
      localVue,
      router
    });
    expect(wrapper.vm.isOpen).to.be.true;
    wrapper.vm.openTab();
    expect(wrapper.vm.isOpen).to.be.false;
  });
});
