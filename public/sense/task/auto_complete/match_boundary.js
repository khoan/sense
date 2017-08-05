Sense['Task.AutoComplete.MatchBoundary'] = function(sense) {
  var tool = {
    word: {
      start: function() {
        var pos = sense.ui.el.query.selectionStart;
        var q = sense.ui.el.query.value;

        for (;;) {
          if (pos < 1) {
            return 0;
          }

          if (q[pos-1].match(/[\s\/]/)) {
            return pos;
          } else {
            pos = pos - 1;
          }
        }
      },
      end: function() {
        var pos = sense.ui.el.query.selectionStart;
        var q = sense.ui.el.query.value;

        for (;;) {
          if (pos >= q.length) {
            return q.length;
          }

          if (q[pos].match(/[\s\/]/)) {
            return pos;
          } else {
            pos = pos + 1;
          }
        }
      }
    }
  };


  return [tool.word.start(), tool.word.end()];
}
