var React = require('react');

var Point = require('./Point.jsx');

var Graph = React.createClass({
  render: function() {
    var pointComponents = this.props.graph.points.map((point) => {
      var xPos = point.xPos * this.props.width;
      var yPos = (1 - point.yPos) * this.props.height;
      return <Point radius={this.props.radius} xPos={xPos} yPos={yPos}/>;
    });

    var lineComponent;
    var {lineIndex, graph} = this.props;
    if (lineIndex || lineIndex === 0) {
      //@todo this is garbage
      var line = graph.lines[lineIndex];
      var constant = line.constant * this.props.height;
      var y1 = this.props.height - constant;
      var x2 = this.props.width;
      var y2 = this.props.height - (constant + line.slope * this.props.width);
      lineComponent = <line x1="0" y1={y1} x2={x2} y2={y2} stroke="red" stroke-width="1" fill="red" />;
    }

    return (
      <svg width={this.props.width} height={this.props.height}>
        <rect width={this.props.width} height={this.props.height} onClick={this.props.onClick}></rect>
        {pointComponents}
        {lineComponent}
      </svg>
    );
  }
});

module.exports = Graph;