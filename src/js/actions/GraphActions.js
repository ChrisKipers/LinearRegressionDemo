var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var GraphActions = {
  createPoint: function(graphId, xPos, yPos) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_POINT,
      payload: {
        graphId: graphId,
        xPos: xPos,
        yPos: yPos
      }
    });
  },
  addLine: function(graphId, constant, slope) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_LINE,
      payload: {
        graphId: graphId,
        constant: constant,
        slope: slope
      }
    });
  },
  createGraph: function() {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_GRAPH
    });
  },
  removeGraph: function(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.REMOVE_GRAPH,
      payload: {
        graphId: graphId
      }
    });
  }
};

module.exports = GraphActions;