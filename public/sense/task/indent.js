Sense['Task.Indent'] = function(sense) {
  var query = sense.ui.el.query.value;
  var start = sense.ui.el.query.selectionStart - 1;
  var end;

  for (;;) {
    if (start < 1) {
      start = 0;
      break;
    }

    if (query[start] === "\n") {
      start = start + 1;
      break;
    }

    start = start - 1;
  }

  end = start;
  for (;;) {
    if (query[end] === " ") {
      end = end + 1;
    } else {
      break;
    }
  }

  return query.substring(start, end);
};
