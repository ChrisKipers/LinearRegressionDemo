var React = require('react');

var InputGraph = require('./InputGraph.jsx');

var LineList = require('./LineList.jsx');

var LinearRegressionProcessActions = require('../actions/LinearRegressionProcessActions');
var AppActions = require('../actions/AppActions');

var GraphEditor = React.createClass({
  render: function () {
    return (
      <div className="grapheditor">
        <button onClick={this._generateLinearRegression}>Generate Best Fit Line</button>
        <div>
          <InputGraph graph={this.props.graph} lineIndex={this.props.currentLineIndex} />
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