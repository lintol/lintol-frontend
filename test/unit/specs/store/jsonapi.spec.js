import { fromState, toModel } from '@/state/jsonapi.js';

describe('json api', () => {
  it('FromState', () => {
    var state = {
      repository: {
        reports: {},
        processors: {},
        profiles: {},
        dataResources: {},
        users: {}
      }
    } 
    var store = fromState(state);
    console.log(store);
    expect(store).to.have.property('graph');
    expect(store.graph).to.have.property('reports');
    expect(store.graph).to.have.property('users');
    expect(store.graph).to.have.property('dataResources');
    expect(store.graph).to.have.property('profiles');
    expect(store.graph).to.have.property('processors');
  });

  it('toModel', () => {
    var type ="dataResources";
    var attributes = {
      name: 'fileName',
      filename: 'filename.csv', 
      uri: 'uri' 
    };
    var relationships = {};
    var id = "ef869d25-218a-471b-a8a2-c53411fda55b";
    var serialized = toModel(type, attributes, relationships, id);
    expect(serialized.data.id).to.equal(null);
    expect(serialized.data.attributes.name).to.equal('fileName');
    expect(serialized.data.attributes.filename).to.equal('filename.csv');
    expect(serialized.data.attributes.uri).to.equal('uri');
    console.log(serialized);
  });
});
