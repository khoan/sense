Sense.Api = function() {
  this.send = function(url, request) {
    return fetch(
      new Sense['Api.Request'](url, request)
    );
  };
};
