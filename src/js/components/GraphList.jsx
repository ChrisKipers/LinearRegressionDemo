var React = require('react');
var _ = require('lodash');

var Graph = require('./Graph.jsx');

var GraphActions = require('../actions/GraphActions');

var GraphList = React.createClass({
  render: function() {
    var dimensions = _.pick(this.props, 'width', 'height', 'radius');
    var graphComponents = this.props.graphs.map((graph) => {
      return <Graph points={graph.points} {...dimensions}/>
    });

    return (
      <div>
        {graphComponents}
      </div>
    );
  }
});

module.exports = GraphList;