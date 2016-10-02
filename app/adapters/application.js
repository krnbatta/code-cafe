import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  // Application specific overrides go here
  host: "http://hackerearth.0x10.info",
  namespace: "api"
});
