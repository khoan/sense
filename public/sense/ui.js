Sense.Ui = function(sense, undef) {
  this.data = {
    result: undef
  };
  this.el = {
    url: Sense.Tool.$("#url"),
    query: Sense.Tool.$("#query"),
    result: Sense.Tool.$("#result")
  };
  this.el.control = {
    result: this.el.result.parentElement
  }

  this.editor = new Sense['Ui.Editor'](sense, this);

  this.loading = function(on) {
    if (on) {
      this.el.control.result.classList.add("is-loading");
    } else {
      this.el.control.result.classList.remove("is-loading");
    }
  };

  this.result = function(data) {
    if (data) {
      this.data.result = data;

      this.el.result.value = JSON.stringify(
        JSON.parse(data),
        null,
        2
      );
    }
    return this.data.result;
  };
};
