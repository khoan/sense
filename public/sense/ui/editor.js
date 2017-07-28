Sense['Ui.Editor'] = function(api, ui) {
  var tool = {
    request: {
      pattern: {
        separator: new RegExp("\n\n+", "m"),
      },
      parse: function(blob) {
        return blob.split(this.pattern.separator);
      }
    }
  };

  this.bind = function() {
    var me = this;

    ui.el.query.addEventListener("keydown", function(e) {
      // meta+enter
      if (e.keyCode == 13 && e.metaKey) {
        // TODO determine cursor position
        me.send();
      }
    });
  };

  this.send = function(cursor) {
    ui.loading(true);

    // TODO get request under cursor
    cursor || (cursor = 0);

    api.send(
      ui.el.url.value,
      this.requests()[cursor]
    ).then(function(resp) {
      return resp.text();
    }).then(function(text) {
      ui.loading(false);
      ui.result(text);
    });
  };

  this.requests = function() {
    return tool.request.parse(ui.el.query.value);
  };

  this.bind();
};
