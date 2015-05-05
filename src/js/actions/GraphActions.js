var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var GraphActions = {
  createPoint(graphId, xPos, yPos) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_POINT,
      payload: {
        graphId: graphId,
        xPos: xPos,
        yPos: yPos
      }
    });
  },
  addLine(graphId, constant, slope) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_LINE,
      payload: {
        graphId: graphId,
        constant: constant,
        slope: slope
      }
    });
  },
  createGraph() {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_GRAPH
    });
  },
  removeGraph(graphId) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.REMOVE_GRAPH,
      payload: {
        graphId: graphId
      }
    });
  },
  setGraphProperties(graphId, properties) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.SET_GRAPH_PROPERTIES,
      payload: {
        graphId: graphId,
        properties: properties
      }
    });
  }
};

module.exports = GraphActions;