import { JsonApiDataStore, JsonApiDataStoreModel } from 'jsonapi-datastore';

var idctr = 1;

/*
 creates a graph store from repository information in state object
 */
function fromState (state) {
  var store = new JsonApiDataStore();
  store.graph = state.repository;
  return store;
}

/*
 creates a json api compatible object for post information to the server
 The relationships are only used by profiles and processors at the moment
 */
function _toModelReal (type, attributes, relationships, id) {
  var jsonObj = new JsonApiDataStoreModel(type, id);
  for (var key in attributes) {
    jsonObj.setAttribute(key, attributes[key]);
  }
  var included = [];
  if (relationships) {
    for (var rel in relationships) {
      var relations = [];
      relationships[rel].relations.map(function (relation) {
        idctr += 1;
        var jsonRel = _toModelReal(relationships[rel].type, relation, false, 'temp-id-' + idctr);
        relations.push(jsonRel.jsonObj);
        included.push(jsonRel.jsonObj.serialize().data);
      });

      /* TODO: submit upstream PR to allow optional temp-id */
      jsonObj.setRelationship(
        rel,
        relations
      );
    }
  }
  return { jsonObj, included };
}

function toModel (type, attributes, relationships, id) {
  var model = _toModelReal(type, attributes, relationships, null);

  var serialized = model.jsonObj.serialize();
  if (model.included) {
    serialized.included = model.included;
  }
  return serialized;
}

export { fromState, toModel };
