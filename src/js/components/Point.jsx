var React = require('react');

var Point = React.createClass({
  render: function () {
    var x = this.props.xPos;
    var y = this.props.yPos;
    return (
      <circle cx={x} cy={y} r={this.props.radius} stroke="red" stroke-width="1" fill="red" />
    );
  }
});

module.exports = Point;