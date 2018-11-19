var React = require("React");

function Child3(props) {
  return <span>{props.data.text}</span>;
}

class Child2 extends React.Component {
  constructor() {
    super();
    this.randomVar = {
      text: "Hello world",
    };
  }
  render() {
    return (
      <React.Fragment>
        {Array.from(this.props.items).map(item => <Child3 data={item} key={item.id} />)}
        <span>{this.randomVar.text}</span>
      </React.Fragment>
    );
  }
  componentWillMount() {
    this.randomVar.text = "It worked!";
  }
}

class Child1 extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.handleClick = () => {
      this.setState({ counter: this.state.counter + 1 });
    };
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        <Child2 items={this.props.items} />
        <span>Counter is at: {this.state.counter}</span>
        <span>{this.state.title}</span>
      </div>
    );
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.a && Object.assign({}, prevState, { title: "Hello world" });
  }
}

function App(props) {
  return <Child1 {...props} />;
}

App.getTrials = function(renderer, Root) {
  var items = [{ id: 0, text: "Item 1" }, { id: 1, text: "Item 2" }, { id: 2, text: "Item 3" }];
  let results = [];

  renderer.update(<Root items={items} a={{ counter: 1 }} />);
  results.push(["render simple first render only tree ({counter: 1})", renderer.toJSON()]);
  renderer.update(<Root items={items} a={{ counter: 2 }} />);
  results.push(["render simple first render only tree ({counter: 2})", renderer.toJSON()]);

  return results;
};

if (this.__optimizeReactComponentTree) {
  __optimizeReactComponentTree(App, {
    firstRenderOnly: true,
  });
}

module.exports = App;
