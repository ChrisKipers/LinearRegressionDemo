var React = require('react');
var cx = require('react/addons').addons.classSet;

var _ = require('lodash');

var Graph = require('./Graph.jsx');

var GraphActions = require('../actions/GraphActions');
var AppActions = require('../actions/AppActions');

var GraphList = React.createClass({
  render: function() {
    var dimensions = _.pick(this.props, 'width', 'height', 'radius');
    var graphComponents = this.props.graphs.map((graph) => {
      var classes = cx({
        'graphlist__item': true,
        'graphlist__item--selected': graph.id === this.props.currentGraphId
      });
      return (
        <li key={graph.id}  className={classes}>
          <Graph graph={graph} {...dimensions}/>
          <div className="graphlist__item__capturediv" onClick={this._selectGraph} data-graph-id={graph.id} />
        </li>
      )
    });

    return (
      <div className="graphlist">
        <button onClick={GraphActions.createGraph}>Add</button>
        <button onClick={this._deleteGraph}>Delete</button>
        <ul>
          {graphComponents}
        </ul>
      </div>
    );
  },
  _selectGraph: function({currentTarget}) {
    var graphId = currentTarget.dataset.graphId;
    AppActions.selectGraph(parseInt(graphId));
  },
  _deleteGraph: function() {
    GraphActions.removeGraph(this.props.currentGraphId);
  }
});

module.exports = GraphList;