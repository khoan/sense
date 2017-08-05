Sense['Task.AutoComplete.Suggestion.Match'] = function(sense, boundary) {
  var word = sense.ui.el.query.value.substring(boundary[0], boundary[1]);
  var dict = sense.suggestions.data.dict;

  var matches = [];
  var start = 0;
  var end;

  for (;;) {
    start = dict.indexOf(word, start);

    if (start === -1) {
      return matches;
    }

    end = dict.indexOf('|', start+1);
    start = dict.lastIndexOf('|', start) + 1;

    if (end === -1) {
      matches.push(dict.substring(start));
      return matches;
    }

    matches.push(dict.substring(start, end));
    start = end+1;

    if (word === "{") {
      return matches;
    }
  }
};
