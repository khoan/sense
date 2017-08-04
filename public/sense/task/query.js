Sense['Task.Query'] = function(sense) {
  this.run = function(reqNum) {
    var req = sense.ui.editor.request(reqNum);

    if (req) {
      sense.ui.loading(true);

      sense.api.send(
        sense.ui.el.url.value,
        req

      ).then(function(resp) {
        return resp.text();

      }).then(function(text) {
        sense.ui.loading(false);
        sense.ui.result(text);
      });
    } else {
      alert("Please place cursor over request.");
    }
  };
};
