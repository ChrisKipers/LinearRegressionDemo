var dispatch = require('./dispatch');
var {ACTIONS} = require('../Constants');

var AppActions = {
  selectGraph(graphId) {
    dispatch(ACTIONS.SELECT_GRAPH, {graphId});
  },
  setGraphHistoryOpenState(isOpen) {
    dispatch(ACTIONS.SET_GRAPH_HISTORY_OPEN_STATE, {isOpen});
  }
};

module.exports = AppActions;