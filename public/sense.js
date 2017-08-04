var Sense = new Function;

Sense.prototype.start = function() {
  this.api = new Sense.Api(this);
  this.ui = new Sense.Ui(this);
  this.suggestions = new Sense['Task.AutoComplete.Suggestion'](this);
};
