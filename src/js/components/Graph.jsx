var React = require('react');
var HighCharts = require('react-highcharts');

var Point = require('./Point.jsx');

var Graph = React.createClass({
  render: function () {
    var pointsAsArrays = this.props.graph.points.map((point) => [point.xPos, point.yPos]);
    var pointComponents = this.props.graph.points.map((point) => {
      var xPos = point.xPos * this.props.width;
      var yPos = (1 - point.yPos) * this.props.height;
      return <Point radius={this.props.radius} xPos={xPos} yPos={yPos}/>;
    });

    var lineSeries;
    var {lineIndex, graph} = this.props;
    if (lineIndex || lineIndex === 0) {
      //@todo this is garbage
      var line = graph.lines[lineIndex];
      var linePointOneY= getValueOnLine(line.constant, line.slope, graph.chartInfo.minX);
      var linePointTwoY = getValueOnLine(line.constant, line.slope, graph.chartInfo.maxX);

      lineSeries = {
        type: 'line',
        data: [
          {
            x: graph.chartInfo.minX,
            y: linePointOneY
          },
          {
            x: graph.chartInfo.maxX,
            y: linePointTwoY
          }
        ]
      };
    }

    var config = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        events: {
          click: this.props.onClick
        }
      },
      yAxis: {
        min: graph.chartInfo.minY,
        max: graph.chartInfo.maxY
      },
      xAxis: {
        min: graph.chartInfo.minX,
        max: graph.chartInfo.maxX
      },
      series: [{
        data: pointsAsArrays
      }]
    };

    if (lineSeries) {
      config.series.push(lineSeries);
    }

    return (
      <HighCharts config={config} />
      //<svg width={this.props.width} height={this.props.height}>
      //  <rect width={this.props.width} height={this.props.height} onClick={this.props.onClick}></rect>
      //  {pointComponents}
      //  {lineComponent}
      //</svg>
    );
  }
});

function getValueOnLine(constant, slope, point) {
  return constant + point * slope;
}

module.exports = Graph;