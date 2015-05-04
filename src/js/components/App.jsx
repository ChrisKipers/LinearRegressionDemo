var React = require('react');
var _ = require('lodash');

var Navbar = require('./Navbar.jsx');
var GraphEditor = require('./GraphEditor.jsx');
var GraphList = require('./GraphList.jsx');

var GraphStore = require('../stores/GraphStore');
var AppState = require('../stores/AppState');
var LinearRegressionProcessStore = require('../stores/LinearRegressionProcessStore');

var App = React.createClass({
  getInitialState: function() {
    return this._getState();
  },
  componentDidMount: function () {
    GraphStore.addChangeListener(this.updateState);
    AppState.addChangeListener(this.updateState);
  },
  componentWillUnmount: function() {
    GraphStore.removeChangeListener(this.updateState);
    AppState.removeChangeListener(this.updateState);
  },
  render: function() {
    var currentGraph = _.findWhere(this.state.graphs, {id: this.state.currentGraphId});
    return (
      <div>
        <Navbar />
        <side>
          <GraphList graphs={this.state.graphs} currentGraphId={this.state.currentGraphId}/>
        </side>
        <main>
          <GraphEditor graph={currentGraph} currentLineIndex={this.state.currentLineIndex}/>
        </main>
      </div>
    );
  },
  updateState: function() {
    this.setState(this._getState());
  },
  _getState: function() {
    return {
      graphs: GraphStore.getGraphs(),
      currentGraphId: AppState.getCurrentGraphId(),
      currentLineIndex: AppState.getCurrentLineIndex(),
      processingGraphIds: LinearRegressionProcessStore.getIdsOfGraphsBeingProcessed()
    };
  }
});

module.exports = App;