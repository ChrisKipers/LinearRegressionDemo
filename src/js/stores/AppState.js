var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var GraphStore = require('./GraphStore');

var currentGraphId;


var AppState = assign({}, EventEmitter.prototype, {
  getCurrentGraphId: function() {
    return currentGraphId;
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
      case Constants.ACTIONS.CREATE_GRAPH:
        AppDispatcher.waitFor[GraphStore.dispatcherIndex];
        var graphs = getGraphs.getGraphs();
        var newGraph = graphs[graphs.length - 1];
        currentGraphId = newGraph.id;
        AppState.emitChange();
        break;
      case Constants.ACTIONS.SELECT_GRAPH:
        currentGraphId = action.payload.graphId;
        AppState.emitChange();
        break;
    }

    return true;
  })

});

module.exports = AppState;
