var React = require('react');

var Point = require('./Point.jsx');

var GraphActions = require('../actions/GraphActions');

var Graph = React.createClass({
  render: function() {
    var pointComponents = this.props.points.map((point) => {
      var xPos = point.xPos * this.props.width;
      var yPos = point.yPos * this.props.height;
      return <Point radius={this.props.radius} xPos={xPos} yPos={yPos}/>;
    });

    return (
      <svg width={this.props.width} height={this.props.height}>
        <rect width={this.props.width} height={this.props.height} onClick={this._addPoint}></rect>
        {pointComponents}
      </svg>
    );
  },
  _addPoint: function(e) {
    var el = this.getDOMNode();
    var xPos = e.pageX - el.offsetLeft;
    var yPos = e.pageY - el.offsetTop;
    var xPer = xPos / this.props.width;
    var yPer = yPos / this.props.height;
    GraphActions.createPoint(xPer, yPer);
  }
});

module.exports = Graph;