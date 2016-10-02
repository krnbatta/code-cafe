import Ember from 'ember';
import constants from "../utils/constants";

export default Ember.Route.extend({
  beforeModel: function() {
    var host = constants.HOST, page = 1, hitServer = true, all = [], self = this;
    for(page; page<=constants.TOTAL_PAGES; page++){
      (function closure(page){
        console.log(page);
        all.push(self.store.query('submission', {type: "json", query: "list_submissions", page: page}));
      })(page);
    }
    return Ember.RSVP.all(all);
  },
  model: function(){
    debugger
    return this.store.peekAll("submission");
  },
  setupController: function(controller, model){
    controller.set("model", model);
    controller.getReports();
  }
  // afterModel: function(model){
  //   var languages_arr = [];
  //   model.forEach(function(record){
  //     if(languages_arr.indexOf(record.get("language"))==-1){
  //       languages_arr.push(record.get("language"));
  //     }
  //   });
  //   console.log(languages_arr);
  // }
  // setupController: function(controller, model){
  //   var records_arr = []
  //   model.forEach(function(records){
  //     for(var i=0;i<2;i++){
  //       records_arr.push(records.objectAt(i));
  //     }
  //   });
  //   var newModel = Ember.ArrayProxy.create({content: Ember.A(records_arr)});
  //   controller.set("model", newModel);
  // }
});
