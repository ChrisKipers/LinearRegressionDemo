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
  getGraphById: function(graphId) {
    return _.findWhere(graphs, {id: graphId});
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
      case Constants.ACTIONS.REMOVE_GRAPH:
        graphs = graphs.filter((graph) => graph.id !== action.payload.graphId);
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.ADD_POINT:
        var graph = GraphStore.getGraphById(action.payload.graphId);
        var newPoint = _.pick(action.payload, 'xPos', 'yPos');
        graph.points.push(newPoint);
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.ADD_LINE:
        var line = _.pick(action.payload, 'constant', 'slope');
        var graph = GraphStore.getGraphById(action.payload.graphId);
        graph.lines.push(line);
        GraphStore.emitChange();
        break;
    }

    return true;
  })
});

function createNewGraph() {
  var newGraph = {
    id: nextGraphId++,
    points: [],
    lines: [],
    chartInfo: {
      minX: 0,
      maxX: 100,
      minY: 0,
      maxY: 100
    }
  };
  return newGraph;
}

module.exports = GraphStore;
