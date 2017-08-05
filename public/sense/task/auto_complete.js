Sense['Task.AutoComplete'] = function(sense) {
  var tool = {
    expand: function(suggestion, boundary) {
      var snippet;
      var caret;
      var indent;

      if (suggestion === "{") {
        indent = Sense['Task.Indent'](sense);
        snippet = `{\n${indent}  \n}`;
        caret = boundary[0] + 2 + indent.length + 2;
        return [snippet, caret];
      }

      snippet = sense.suggestions.word(suggestion);
      caret = boundary[0] + snippet.length;

      if (sense.suggestions.on("quote", suggestion)) {
        snippet = `"${snippet}"`;
        caret = boundary[0] + snippet.length;
      }

      if (sense.suggestions.on("brace", suggestion)) {
        indent = Sense['Task.Indent'](sense);
        console.log("indent brace", indent.length);
        caret = boundary[0] + snippet.length + 4 + indent.length + 2;
        snippet = `${snippet}: {\n${indent}  \n${indent}}`;
      }

      if (sense.suggestions.on("hint", suggestion)) {
        // TODO insert hint at cursor
        //      move caret to end of hint
      }

      return [snippet, caret];
    }
  };

  this.run = function() {
    var boundary = Sense['Task.AutoComplete.MatchBoundary'](sense);
    var list = Sense['Task.AutoComplete.Suggestion.Match'](sense, boundary);

    if (list.length === 0) {
      console.log("no matches");

    } else if (list.length === 1) {
      var expansion = tool.expand(list[0], boundary);
      this.complete(expansion[0], boundary, expansion[1]);

    } else {
      console.log("suggestions:", list);
    }
  };

  this.complete = function(snippet, boundary, caret) {
    var query = sense.ui.el.query.value;

    sense.ui.el.query.value = `${query.substring(0, boundary[0])}${snippet}${query.substring(boundary[1])}`;
    sense.ui.el.query.selectionStart = sense.ui.el.query.selectionEnd = caret;
    sense.ui.el.query.focus();
  };
}
