'use strict';

var React = require('react');
var cx = require('react/addons').addons.classSet;

var Graph = require('./Graph.jsx');

var GraphActions = require('../actions/GraphActions');
var AppActions = require('../actions/AppActions');

var GraphList = React.createClass({
  render() {
    var graphComponents = this.props.graphs.map((graph) => {
      var classes = cx({
        'graphhistory__item': true,
        'graphhistory__item--selected': graph.id === this.props.currentGraphId
      });
      return (
        <li key={graph.id} className={classes}>
          <Graph graph={graph} />
          <div className="graphhistory__item__capturediv" onClick={this._selectGraph} data-graph-id={graph.id} />
        </li>
      );
    });

    return (
      <div className="graphhistory">
        <ul>
          {graphComponents}
        </ul>
      </div>
    );
  },
  _selectGraph({currentTarget}) {
    var graphId = currentTarget.dataset.graphId;
    AppActions.selectGraph(parseInt(graphId));
  },
  _deleteGraph() {
    GraphActions.removeGraph(this.props.currentGraphId);
  }
});

module.exports = GraphList;
