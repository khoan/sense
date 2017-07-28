var Sense = new Function;

Sense.prototype.start = function() {
  this.api = new Sense.Api;
  this.ui = new Sense.Ui(this.api);
};
