var _ = require('lodash');

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var GraphStore = require('./GraphStore');

var currentGraphId, currentLineIndex;


var AppState = assign({}, EventEmitter.prototype, {
  getCurrentGraphId: function() {
    return currentGraphId;
  },
  getCurrentLineIndex: function () {
    return currentLineIndex;
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
        var newGraph = graphs[graphs.length - 1];
        currentGraphId = newGraph.id;
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.REMOVE_GRAPH:
        AppDispatcher.waitFor[GraphStore.dispatcherIndex];
        var nextCurrentGraphId = getCurrentGraphIdAfterRemoveEvent();
        var shouldEmitChange = nextCurrentGraphId !== currentGraphId;
        currentGraphId = nextCurrentGraphId;
        setCurrentLineIndex();
        if (shouldEmitChange) {
          AppState.emitChange();
        }
        break;
      case Constants.ACTIONS.SELECT_GRAPH:
        currentGraphId = action.payload.graphId;
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.ADD_LINE:
        setCurrentLineIndex();
        AppState.emitChange();
        break;
      case Constants.ACTIONS.SELECT_LINE:
        currentLineIndex = action.payload.lineIndex;
        AppState.emitChange();
        break;
    }

    return true;
  })

});

function getCurrentGraphIdAfterRemoveEvent() {
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
  var currentGraph = GraphStore.getGraphById(currentGraphId);
  if (currentGraph && currentGraph.lines.length) {
    currentLineIndex = currentGraph.lines.length - 1;
  } else {
    currentLineIndex = null;
  }
}

module.exports = AppState;
