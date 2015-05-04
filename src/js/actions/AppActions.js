var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var AppActions = {
  selectGraph: function(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.SELECT_GRAPH,
      payload: {
        graphId: graphId
      }
    });
  },
  selectLine: function(lineIndex) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.SELECT_LINE,
      payload: {
        lineIndex: lineIndex
      }
    });
  }
};

module.exports = AppActions;