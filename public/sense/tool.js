Sense.Tool = {
  $: function(cssSelector, scope, all) {
    scope || (scope = document);
    all = all ? 'querySelectorAll' : 'querySelector';
    return scope[all](cssSelector);
  }
};
