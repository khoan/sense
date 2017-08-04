Sense['Task.AutoComplete.Suggestion'] = function(sense) {
  this.data = {
    dict: "\
GET PUT POST DELETE HEAD \
{ \
_cluster _search _mapping _aliases _all \
query filtered filter bool must match term terms \
aggs \
",
    snippet: {
      GET: "GET ",
      POST: "POST ",
      PUT: "PUT ",
      DELETE: "DELETE ",
      HEAD: "HEAD ",
      "{": "{}", // TODO indent level and cursor position
      query: "",
      filtered: ""
    }
  };
};
