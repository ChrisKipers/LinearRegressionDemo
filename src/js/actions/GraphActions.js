var dispatch = require('./dispatch');
var {ACTIONS} = require('../Constants');

var GraphActions = {
  createPoint(graphId, xPos, yPos) {
    var payload = {graphId, xPos, yPos};
    dispatch(ACTIONS.ADD_POINT, payload);
  },
  addLine(graphId, constant, slope) {
    var payload = {graphId, constant, slope};
    dispatch(ACTIONS.ADD_LINE, payload);
  },
  createGraph() {
    dispatch(ACTIONS.ADD_GRAPH);
  },
  removeGraph(graphId) {
    dispatch(ACTIONS.REMOVE_GRAPH, {graphId});
  },
  setGraphProperties(graphId, properties) {
    var payload = {graphId, properties};
    dispatch(ACTIONS.SET_GRAPH_PROPERTIES, payload);
  }
};

module.exports = GraphActions;