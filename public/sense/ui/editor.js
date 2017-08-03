Sense['Ui.Editor'] = function(api, ui) {
  var tool = {
    request: {
      pattern: {
        separator: new RegExp("\n\n+", "m"),
      },
      parse: function(blob) {
        return blob.split(this.pattern.separator);
      },
      valid: function() {
        var requests = ui.el.query.value;
        var pos = ui.el.query.selectionStart;

        if (pos === 0) {
          return ! requests[pos].match(/\s/);

        } else if (pos === requests.length) {
          return ! requests[pos-1].match(/\s/);

        } else {
          return ! requests[pos].match(/\s/) || ! requests[pos-1].match(/\s/);
        }
      },
      start: function() {
        var pos = ui.el.query.selectionStart;

        for (;;) {
          if (pos < 1) {
            return 0;
          }

          if (ui.el.query.value[pos-1] === "\n") {
            if (pos == 1) {
              return pos;
            } else if (ui.el.query.value[pos-2] === "\n") {
              return pos;
            } else {
              pos = pos - 2;
            }
          } else {
            pos = pos - 1;
          }
        }
      },
      end: function() {
        var pos = ui.el.query.selectionEnd;

        for (;;) {
          if (pos > ui.el.query.value.length) {
            return pos;
          }

          if (ui.el.query.value[pos] === "\n") {
            if (ui.el.query.value[pos+1] === "\n") {
              return pos;
            } else {
              pos = pos + 2;
            }
          } else {
            pos = pos + 1;
          }
        }
      }
    },
    key: {
      is: function(e, name) {
        if (name === "meta+enter") {
          return  e.metaKey && e.keyCode == 13;
        }
      }
    }
  };

  this.bind = function() {
    var me = this;

    ui.el.query.addEventListener("keydown", function(e) {
      if (tool.key.is(e, "meta+enter")) {
        new Sense['Task.Query'](api, ui).run();
      }
    });
  };

  this.request = function(number) {
    if (typeof number === "number") {
      return this.requests()[number];

    } else {
      if (tool.request.valid()) {
        return ui.el.query.value.substring(
          tool.request.start(),
          tool.request.end()
        );
      }
    }
  };

  this.requests = function() {
    return tool.request.parse(ui.el.query.value);
  };




  this.bind();
};
