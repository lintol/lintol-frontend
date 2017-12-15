import Application from '@/components/Application';

describe('Application.vue', () => {
  it('Data is a function', () => {
    expect(Application.data).to.be.a('function');
  });
});
