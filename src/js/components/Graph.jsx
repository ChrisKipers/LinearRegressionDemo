var React = require('react');
var _ = require('lodash');
var HighCharts = require('react-highcharts');

var Graph = React.createClass({
  render: function () {
    var chartConfig = this._getChartConfig();
    return (
      <HighCharts config={chartConfig} />
    );
  },
  _getChartConfig: function() {
    var graph = this.props.graph;
    var pointsAsArrays = this.props.graph.points.map((point) => [point.xPos, point.yPos]);
    var lineSeries = this._getLineSeries();
    var config = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        animation: false,
        events: {
          click: this.props.onClick || _.identity
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
        data: pointsAsArrays,
        animation: false
      }]
    };

    if (lineSeries) {
      config.series.push(lineSeries);
    }

    return config;
  },
  _getLineSeries: function() {
    var graph = this.props.graph;
    var line = _.last(this.props.graph.lines);
    if (line) {
      var linePointOneY= getValueOnLine(line.constant, line.slope, graph.chartInfo.minX);
      var linePointTwoY = getValueOnLine(line.constant, line.slope, graph.chartInfo.maxX);

      return {
        type: 'line',
        animation: false,
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
  }
});

function getValueOnLine(constant, slope, point) {
  return constant + point * slope;
}

module.exports = Graph;