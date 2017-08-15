Sense['Task.AutoComplete.Suggestion'] = function(sense) {
  this.data = {
    dict: '\
GET |PUT |POST |DELETE |HEAD |\
{|\
_cluster|_search|_mapping|_aliases|_all|\
"query{|"filtered{|"filter{|"bool{|"must[|"match{|"term{|"terms{|"field|\
"aggs{|\
"size|"fields|\
'
  };

  this.word = function(suggestion) {
    return suggestion.match(/[^["{]+/)[0];
  };

  this.on = function(task, suggestion) {
    if (task === "quote") {
      return suggestion[0] === '"';
    } else if (task === "bracket") {
      return suggestion[suggestion.length] === '[' ||
        suggestion[suggestion.length-1] === '[';
    } else if (task === "brace") {
      return suggestion[suggestion.length] === '{' ||
        suggestion[suggestion.length-1] === '{';
    } else if (task === "hint") {
      return suggestion[suggestion.length] === 'h';
    }
  };
};
