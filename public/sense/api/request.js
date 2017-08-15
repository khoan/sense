Sense['Api.Request'] = function(url, request) {
  var tool = {
    url: {
      parse: function(url) {
        var a = document.createElement("a");
        a.href = url;

        if (a.protocol.indexOf("http") === -1) {
          return {
            protocol: "http:",
            host: url
          };
        } else {
          return a;
        }
      }
    },
    request: {
      url: function(uri, options) {
        return `${uri.protocol}//${uri.host}/${options.path}`;
      },
      options: function(uri, options) {
        var auth;
        var headers = new Headers;
        var opts = {
          method: options.method,
          headers: headers,
        };

        if (options.payload) {
          headers.append("Content-Type", "application/json");

          // TODO stop switching GET to POST, and
          //      pass payload as source query string param
          // https://www.elastic.co/guide/en/elasticsearch/reference/1.7/search-request-body.html
          opts.body = options.payload;

          if (options.path.indexOf("_search") !== -1 && opts.method === "GET") {
            opts.method = "POST";
          }
        }

        if (uri.username && uri.password) {
          auth = btoa(`${uri.username}:${uri.password}`);
          headers.append("Authorization", `Basic ${auth}`);
        }

        return opts;
      },
      parse: function(request) {
        var payload;
        var sep = request.indexOf("\n");

        if (sep === -1) {
          sep = undefined;
        } else {
          payload = request.substring(sep+1).replace(/\n */g, "");
        }

        var command = request.slice(0, sep).split(/ +/);

        return {
          method: command[0],
          path: command[1],
          payload: payload
        };
      }
    }
  };

  var uri = tool.url.parse(url);
  var req = tool.request.parse(request);

  return new Request(
    tool.request.url(uri, req),
    tool.request.options(uri, req)
  );
};
