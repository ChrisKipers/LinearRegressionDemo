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
  }
};

module.exports = AppActions;