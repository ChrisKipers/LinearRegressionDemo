var React = require('react');

var Graph = require('./Graph.jsx');

var GraphActions = require('../actions/GraphActions');

var EditableGraph = React.createClass({
  render: function() {
    return (
      <Graph onClick={this._addPoint} {...this.props} />
    );
  },
  _addPoint: function(e) {
    var {offsetLeft, offsetTop} = this._getParentOffset();
    var xPos = e.pageX - offsetLeft;
    var yPos = e.pageY - offsetTop;
    var xPer = xPos / this.props.width;
    var yPer = (this.props.height - yPos) / this.props.height;
    console.log(xPer, yPer);
    GraphActions.createPoint(this.props.graph.id, xPer, yPer);
  },
  _getParentOffset: function() {
    var offsetLeft = 0;
    var offsetTop = 0;
    var currentElement = this.getDOMNode();
    while(currentElement) {
      offsetLeft += currentElement.offsetLeft;
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent;
    }
    return {offsetLeft, offsetTop};
  }
});

module.exports = EditableGraph;