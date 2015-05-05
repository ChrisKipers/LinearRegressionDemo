var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var LinearRegressionProcessActions = {
  processGraph(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.PROCESS_GRAPH,
      payload: {
        graphId: graphId
      }
    });
  },
  processingComplete(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.PROCESS_GRAPH_COMPLETE,
      payload: {
        graphId: graphId
      }
    });
  }
};

module.exports = LinearRegressionProcessActions;