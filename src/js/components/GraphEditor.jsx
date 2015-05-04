var React = require('react');
var _ = require('lodash');

var InputGraph = require('./InputGraph.jsx');

var LineInfo = require('./LineInfo.jsx');

var LinearRegressionProcessActions = require('../actions/LinearRegressionProcessActions');
var AppActions = require('../actions/AppActions');

var GraphEditor = React.createClass({

  render: function () {
    var lineComponent = this._getLineInfo();
    return (
      <div className="grapheditor">
        <div>
          <InputGraph graph={this.props.graph} lineIndex={this.props.currentLineIndex} />
        </div>
        <div>
          <button onClick={this._generateLinearRegression}>Generate Best Fit Line</button>
          <span>Best Fit Line:</span>{lineComponent}
        </div>
      </div>
    );
  },
  _generateLinearRegression: function () {
    LinearRegressionProcessActions.processGraph(this.props.graph.id);
  },
  _selectLine: function ({currentTarget}) {
    var lineIndex = parseInt(currentTarget.dataset.lineIndex);
    AppActions.selectLine(lineIndex);
  },
  _getLineInfo() {
    var mostAccurateLine = _.last(this.props.graph.lines);
    if (mostAccurateLine) {
      return <LineInfo line={mostAccurateLine} />
    } else {
      return <span>Line not calculated</span>
    }
  }
});

module.exports = GraphEditor;