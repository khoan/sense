Sense['Task.AutoComplete'] = function(sense) {
  this.run = function() {
    var word = Sense['Task.AutoComplete.Word'](sense);
    var list = Sense['Task.AutoComplete.Suggestion.Match'](sense, word[0]);

    if (list.length === 0) {
      console.log("no matches");

    } else if (list.length === 1) {
      this.complete(list[0], word[1], word[2]);

    } else {
      console.log("show completions", list);
    }
  };

  this.complete = function(word, start, end) {
    var snippet = sense.suggestions.data.snippet[word] || word;
    var query = sense.ui.el.query.value;

    sense.ui.el.query.value = `${query.substring(0, start)}${snippet}${query.substring(end)}`;
    sense.ui.el.query.selectionStart = sense.ui.el.query.selectionEnd = start + snippet.length;
    sense.ui.el.query.focus();
  };
}
