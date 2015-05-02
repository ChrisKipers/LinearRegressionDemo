var AppDispatcher = require('../AppDispatcher');
var Constants = require('../Constants');

var GraphActions = {
  createPoint: function(xPos, yPos) {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_POINT,
      payload: {
        xPos: xPos,
        yPos: yPos
      }
    });
  },
  createGraph: function() {
    AppDispatcher.dispatch({
      actionType: Constants.ACTIONS.ADD_GRAPH
    });
  }
};

module.exports = GraphActions;