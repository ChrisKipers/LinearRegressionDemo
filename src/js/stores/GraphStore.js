var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var points = [];

var graphs = [];

var nextGraphId = 0;


var GraphStore = assign({}, EventEmitter.prototype, {
  getGraphs: function() {
    return graphs;
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
        graphs.push(createNewGraph());
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.ADD_POINT:
        var graph = getGraphById(action.payload.graphId);
        var newPoint = _.pick(action.payload, 'xPos', 'yPos');
        graph.points.push(newPoint);
        GraphStore.emitChange();
        break;
    }

    return true;
  })
});

function getGraphById(id) {
  return _.findWhere(graphs, {id: id});
}

function createNewGraph() {
  var newGraph = {
    id: nextGraphId++,
    points: [],
    lines: []
  };
  return newGraph;
}

module.exports = GraphStore;
