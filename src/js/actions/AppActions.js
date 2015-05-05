var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var AppActions = {
  selectGraph(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.SELECT_GRAPH,
      payload: {
        graphId: graphId
      }
    });
  },
  setGraphHistoryOpenState(isOpen) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.SET_GRAPH_HISTORY_OPEN_STATE,
      payload: {
        isOpen: isOpen
      }
    });
  }
};

module.exports = AppActions;