var dispatch = require('./dispatch');
var {ACTIONS} = require('../Constants');

var LinearRegressionProcessActions = {
  processGraph(graphId) {
    dispatch(ACTIONS.PROCESS_GRAPH, {graphId});
  },
  processingComplete(graphId) {
    dispatch(ACTIONS.PROCESS_GRAPH_COMPLETE, {graphId});
  }
};

module.exports = LinearRegressionProcessActions;