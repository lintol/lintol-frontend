// import Vue from 'vue';
import Vuex from 'vuex';
import ProcessorConfiguration from '@/components/profiles/ProcessorConfiguration';
import { shallow, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

var processorConfiguration1 = {
  processor: {
    name: 'csv processor',
    description: 'CSV description'
  }
};

describe('ProcessorConfiguration.vue', () => {
  const wrapper = shallow(ProcessorConfiguration, {
    propsData: {
      value: '',
      configuration: processorConfiguration1
    },
    localVue
  });
  it('Data is a function', () => {
    expect(ProcessorConfiguration.data).to.be.a('function');
  });
  it('Get processor', () => {
    expect(wrapper.vm.processor.name).to.equal('csv processor');
  });
  it('Save configuration and emit', () => {
    wrapper.vm.saveConfiguration();
    expect(wrapper.emitted()).has.property('input');
    expect(wrapper.vm.editConfiguration).to.equal(true);
  });
  it('Remove configuration and emit', () => {
    wrapper.vm.removeProcessor();
    expect(wrapper.emitted()).has.property('removeProcessor');
    console.log(wrapper.emitted().removeProcessor[0][0]);
    expect(wrapper.emitted().removeProcessor[0][0]).to.equal('csv processor');
    expect(wrapper.vm.editConfiguration).to.equal(true);
  });
<<<<<<< HEAD
  it('configurationOptions', () => {
    wrapper.vm.processor.configurationOptions = {'soomething' : 'blabla','SomethingElse':'blabla',};
  });

=======
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
});
