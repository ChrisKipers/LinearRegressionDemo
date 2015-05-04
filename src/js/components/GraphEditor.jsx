var React = require('react');

var InputGraph = require('./InputGraph.jsx');

var LineList = require('./LineList.jsx');

var Constants = require('../Constants');

var LinearRegressionProcessActions = require('../actions/LinearRegressionProcessActions');
var AppActions = require('../actions/AppActions');

var GraphEditor = React.createClass({
  render: function() {
    var {CIRCLE_RADIUS, GRAPH_WIDTH, GRAPH_HEIGHT} = Constants.DIMENSIONS;
    return (
      <div>
        <button onClick={this._generateLinearRegression}>Click me!!!</button>
        <div>
          <InputGraph graph={this.props.graph} lineIndex={this.props.currentLineIndex} width={GRAPH_WIDTH} height={GRAPH_HEIGHT} radius={CIRCLE_RADIUS} />
        </div>
        <LineList lines={this.props.graph.lines} currentLineIndex={this.props.currentLineIndex} onClick={this._selectLine}/>
      </div>
    );
  },
  _generateLinearRegression: function () {
    LinearRegressionProcessActions.processGraph(this.props.graph.id);
  },
  _selectLine: function ({currentTarget}) {
    var lineIndex = parseInt(currentTarget.dataset.lineIndex);
    AppActions.selectLine(lineIndex);
  }
});

module.exports = GraphEditor;