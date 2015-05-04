var _ = require('lodash');

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var GraphStore = require('./GraphStore');

var state = {};

var AppState = assign({}, EventEmitter.prototype, {
  getState: function() {
    return state;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function (action) {
    switch (action.actionType) {
      case Constants.ACTIONS.ADD_GRAPH:
        AppDispatcher.waitFor[GraphStore.dispatcherIndex];
        var graphs = GraphStore.getGraphs();
        var newGraph = _.last(graphs);
        state.currentGraphId = newGraph.id;
        AppState.emitChange();
        break;
      case Constants.ACTIONS.REMOVE_GRAPH:
        AppDispatcher.waitFor[GraphStore.dispatcherIndex];
        var nextCurrentGraphId = getCurrentGraphIdAfterRemoveEvent();
        var shouldEmitChange = nextCurrentGraphId !== state.currentGraphId;
        state.currentGraphId = nextCurrentGraphId;
        if (shouldEmitChange) {
          AppState.emitChange();
        }
        break;
      case Constants.ACTIONS.SELECT_GRAPH:
        state.currentGraphId = action.payload.graphId;
        state.showGraphHistory = false;
        AppState.emitChange();
        break;
      case Constants.ACTIONS.ADD_LINE:
        AppState.emitChange();
        break;
      case Constants.ACTIONS.SET_GRAPH_HISTORY_OPEN_STATE:
        state.showGraphHistory = action.payload.isOpen;
        AppState.emitChange();
        break;
    }

    return true;
  })

});

function getCurrentGraphIdAfterRemoveEvent() {
  var graphs = GraphStore.getGraphs();
  var currentGraph = GraphStore.getGraphById(state.currentGraphId);

  if (currentGraph) {
    return state.currentGraphId;
  }

  if(graphs.length) {
    return graphs[0].id;
  } else {
    return null;
  }
}

module.exports = AppState;
