Sense['Task.Query'] = function(api, ui) {
  this.run = function(reqNum) {
    var req = ui.editor.request(reqNum);

    if (req) {
      ui.loading(true);

      api.send(
        ui.el.url.value,

      ).then(function(resp) {
        return resp.text();

      }).then(function(text) {
        ui.loading(false);
        ui.result(text);
      });
    } else {
      alert("Please place cursor over request.");
    }
  };
};
