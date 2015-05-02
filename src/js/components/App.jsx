var React = require('react');
var Graph = require('./Graph.jsx');
var GraphList = require('./GraphList.jsx');

var Constants = require('../Constants');

var GraphStore = require('../stores/GraphStore');


var App = React.createClass({
  getInitialState: function() {
    return {
      graphs: GraphStore.getGraphs()
    };
  },
  componentDidMount: function () {
    GraphStore.addChangeListener(this.updateGraphs);
  },
  componentWillUnmount: function() {
    GraphStore.removeChangeListener(this.updateGraphs);
  },
  render: function() {
    var {CIRCLE_RADIUS, GRAPH_WIDTH, GRAPH_HEIGHT} = Constants.DIMENSIONS;
    return (
      <div>
        <GraphList graphs={this.state.graphs} width={200} height={100} radius={5}/>
        <button onClick={this._generateLinearRegression}>Click me!!!</button>
      </div>
    );
  },
  updateGraphs: function() {
    this.setState({graphs: GraphStore.getGraphs()});
  },
  _generateLinearRegression: function () {
    var worker = new Worker('/src/js/workers/LinearRegressionCalculator.js');
    worker.onmessage = (results) => console.log(results);
    worker.postMessage("hi")
  }
});

module.exports = App;