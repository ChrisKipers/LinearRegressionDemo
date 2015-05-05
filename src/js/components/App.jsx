var React = require('react');
var _ = require('lodash');

var Navbar = require('./Navbar.jsx');
var GraphEditor = require('./GraphEditor.jsx');
var GraphHistory = require('./GraphHistory.jsx');
var Modal = require('./Modal.jsx');

var GraphStore = require('../stores/GraphStore');
var AppState = require('../stores/AppState');
var LinearRegressionProcessStore = require('../stores/LinearRegressionProcessStore');

var AppActions = require('../actions/AppActions');

var App = React.createClass({
  getInitialState() {
    return this._getState();
  },
  componentDidMount() {
    GraphStore.addChangeListener(this.updateState);
    AppState.addChangeListener(this.updateState);
  },
  componentWillUnmount() {
    GraphStore.removeChangeListener(this.updateState);
    AppState.removeChangeListener(this.updateState);
  },
  render() {
    var {graphs, appState: {currentGraphId}} = this.state;
    var currentGraph = _.findWhere(graphs, {id: currentGraphId});
    var graphHistoryModal = this._getGraphHistoryModal();
    return (
      <div>
        {graphHistoryModal}
        <Navbar />
        <GraphEditor graph={currentGraph} />
      </div>
    );
  },
  updateState() {
    this.setState(this._getState());
  },
  _getState() {
    return {
      graphs: GraphStore.getGraphs(),
      appState: AppState.getState(),
      processingGraphIds: LinearRegressionProcessStore.getIdsOfGraphsBeingProcessed()
    };
  },
  _getGraphHistoryModal() {
    var {graphs, appState: {currentGraphId, showGraphHistory}} = this.state;
    if(showGraphHistory) {
      return (
        <Modal header="graphs" onClose={this._closeHistoryModal}>
          <GraphHistory graphs={graphs} currentGraphId={currentGraphId}/>
        </Modal>
      );
    }
  },
  _closeHistoryModal() {
    AppActions.setGraphHistoryOpenState(false);
  }
});

module.exports = App;