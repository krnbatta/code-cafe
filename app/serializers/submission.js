import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType){
    delete payload.quote_max;
    delete payload.quote_available;
    payload.submissions = []
    payload.websites.forEach(function(website){
      Object.keys(website).forEach(function(key){
        if(key.indexOf("_")!==-1){
          var _key = Ember.String.camelize(key);
          website[_key] = website[key];
          delete website[key];
        }
      });
      payload.submissions.push(website);
    });
    delete payload.websites;
    return this._super(...arguments);
  }
});
