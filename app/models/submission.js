import DS from 'ember-data';

var model = DS.Model.extend({
    title: DS.attr("string"),
    metadata: DS.attr(),
    sourceCode: DS.attr("string"),
    compilerStatus: DS.attr("string"),
    language: DS.attr("string")
});

export default model;
