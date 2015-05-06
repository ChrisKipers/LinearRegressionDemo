'use strict';

var React = require('react');
var _ = require('lodash');

var InputGraph = require('./InputGraph.jsx');
var LineInfo = require('./LineInfo.jsx');
var GraphPropertiesInput = require('./GraphPropertiesInput.jsx');
var {TabbedArea, TabPane} = require('react-bootstrap');

var LinearRegressionProcessActions = require('../actions/LinearRegressionProcessActions');
var AppActions = require('../actions/AppActions');

var GraphEditor = React.createClass({
  render() {
    var lineComponent = this._getLineInfo();
    return (
      <div className="grapheditor">
        <main>
          <div>
            <InputGraph graph={this.props.graph} />
          </div>
          <div>
            <button onClick={this._generateLinearRegression}>Generate Best Fit Line</button>
            <span>Best Fit Line:</span>{lineComponent}
          </div>
        </main>
        <side>
          <TabbedArea defaultActiveKey={1}>
            <TabPane eventKey={1} tab='Graph Properties'>
              <GraphPropertiesInput graph={this.props.graph}/>
            </TabPane>
            <TabPane eventKey={2} tab='Points'>
              TabPane 2 content
            </TabPane>
          </TabbedArea>
        </side>
      </div>
    );
  },
  _generateLinearRegression() {
    LinearRegressionProcessActions.processGraph(this.props.graph.id);
  },
  _selectLine({currentTarget}) {
    var lineIndex = parseInt(currentTarget.dataset.lineIndex);
    AppActions.selectLine(lineIndex);
  },
  _getLineInfo() {
    var mostAccurateLine = _.last(this.props.graph.lines);
    if (mostAccurateLine) {
      return <LineInfo line={mostAccurateLine} />;
    } else {
      return <span>Line not calculated</span>;
    }
  }
});

module.exports = GraphEditor;
