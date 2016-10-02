import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import constants from "../utils/constants";

export default Ember.Controller.extend({
  // setup our query params
  topLanguages: function(){
    var languageUsage = {}
    this.get("model").forEach(function(submission){
      if (languageUsage[submission.get("language")]){
        languageUsage[submission.get("language")]+=1;
      }
      else{
        languageUsage[submission.get("language")]=1;
      }
    });
    var sortable = [];
    for (var language in languageUsage)
      sortable.push([language, languageUsage[language]])
    sortable.sort(
      function(a, b) {
      return a[1] - b[1]
      }
    )
    this.set("topLanguages", sortable.slice(sortable.length-5));
  },
  topTwoSubmissions: function(){
    top_submissions = []
    this.get("model").forEach(function(record){
      if(!top_submissions[0]){
        top_submissions[0]=record.get("metadata.users_attempted")
      }
      else if(!top_submissions[1]){
        top_submissions[1]=record.get("metadata.users_attempted")
        if(top_submissions[0]>top_submissions[1]){
          top_submissions[1] = top_submissions[0] + top_submissions[1];
          top_submissions[0] = top_submissions[1] - top_submissions[0];
          top_submissions[1] = top_submissions[1] - top_submissions[0];
        }
      }
      else{
        var usersAttempted = record.get("metadata.users_attempted");
        if(usersAttempted>top_submissions[1]){
          top_submissions[0] = top_submissions[1];
          top_submissions[1] = usersAttempted;
        }
        else if(usersAttempted>top_submissions[0]){
          top_submissions[0] = usersAttempted;
        }
      }
    });
    this.set("topTwoSubmissions", top_submissions);
  },
  submissionPerLevel: function(){
    var submission_per_level = {};
    this.get("model").forEach(function(item){
      var level = item.get("metadata.level");
      if(submission_per_level[level]){
        submission_per_level[level]+=1;
      }
      else{
        submission_per_level=1;
      }
    });
    this.set("submissionPerLevel", submission_per_level);
  },
  totalSubmissions: function(){
    this.set("totalSubmissions", this.get("model.length"));
  },
  getReports: function(){
    this.topLanguages();
    this.topTwoSubmissions();
    this.submissionPerLevel();
    this.totalSubmissions();
  },
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 1,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('model', {page: Ember.computed.alias("parent.page"), perPage: Ember.computed.alias("parent.perPage")}),
  totalPages: Ember.computed.alias("pagedContent.totalPages"),
  // binding the property on the paged array
  // to a property on the controller
  actions: {
    pageClicked: function(){
      debugger
      console.log("karan");
    },
    action: function(){
      debugger
      console.log("kran");
    }
  }
});
