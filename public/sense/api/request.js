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

        if (options.payload) {
          headers.append("Content-Type", "application/json");
        }

        if (uri.username && uri.password) {
          auth = btoa(`${uri.username}:${uri.password}`);
          headers.append("Authorization", `Basic ${auth}`);
        }

        var opts = {
          method: options.method === "GET" && options.payload ? "POST" : options.method,
          headers: headers,
        };
        return opts;
      },
      pattern: {
        separator: {
          command: new RegExp(" +"),
          payload: new RegExp("\n", "m")
        }
      },
      parse: function(request) {
        var payload = request.split(this.pattern.separator.payload);
        var command = payload[0].split(this.pattern.separator.command);

        return {
          method: command[0],
          path: command[1],
          payload: payload[1]
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
