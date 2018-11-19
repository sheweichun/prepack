var React = require("react");
var isOptimizedForFirstRender = false;

function App(props) {
  function fn() {
    // should not be here
  }
  function fn2() {
    return props.bar(fn);
  }
  var data = Object.assign({}, { x: 1 }, props, {
    onClick: fn,
    ref: fn2,
    someAbstractThing: function() {
      // do something
    },
  });
  data.someAbstractThing();
  return <div {...data} />;
}

App.getTrials = function(renderer, Root) {
  let val;
  function func(_val) {
    val = _val;
  }
  renderer.update(<Root bar={func} />);
  let results = [];
  results.push(["simple render", renderer.toJSON()]);
  if (isOptimizedForFirstRender === true && val !== undefined) {
    throw new Error("Ref was found! :(");
  }
  return results;
};

if (this.__optimizeReactComponentTree) {
  isOptimizedForFirstRender = true;
  __optimizeReactComponentTree(App, {
    firstRenderOnly: true,
  });
}

module.exports = App;
