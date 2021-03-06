'use strict';

var React = require('react');

var Graph = require('./Graph.jsx');

var GraphActions = require('../actions/GraphActions');

var EditableGraph = React.createClass({
  render() {
    return (
      <Graph onClick={this._addPoint} {...this.props} />
    );
  },
  _addPoint(e) {
    var xPos = e.xAxis[0].value;
    var yPos = e.yAxis[0].value;
    GraphActions.createPoint(this.props.graph.id, xPos, yPos);
  }
});

module.exports = EditableGraph;
