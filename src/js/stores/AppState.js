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
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.REMOVE_GRAPH:
        AppDispatcher.waitFor[GraphStore.dispatcherIndex];
        var nextCurrentGraphId = getCurrentGraphIdAfterRemoveEvent();
        var shouldEmitChange = nextCurrentGraphId !== state.currentGraphId;
        state.currentGraphId = nextCurrentGraphId;
        setCurrentLineIndex();
        if (shouldEmitChange) {
          AppState.emitChange();
        }
        break;
      case Constants.ACTIONS.SELECT_GRAPH:
        state.currentGraphId = action.payload.graphId;
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.ADD_LINE:
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.SELECT_LINE:
        state.currentLineIndex = action.payload.lineIndex;
        AppState.emitChange();
        break;
    }

    return true;
  })

});

function getCurrentGraphIdAfterRemoveEvent() {
  var graphs = GraphStore.getGraphs();
  var currentGraph = GraphStore.getGraphById(currentGraphId);

  if (currentGraph) {
    return currentGraphId;
  }

  if(graphs.length) {
    return graphs[0].id;
  } else {
    return null;
  }

}

function setCurrentLineIndex() {
  var currentGraph = GraphStore.getGraphById(state.currentGraphId);
  if (currentGraph && currentGraph.lines.length) {
    state.currentLineIndex = currentGraph.lines.length - 1;
  } else {
    state.currentLineIndex = null;
  }
}

module.exports = AppState;
