'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var graphs = [];

var nextGraphId = 0;


var GraphStore = assign({}, EventEmitter.prototype, {
  getGraphs() {
    return graphs;
  },
  getGraphById(graphId) {
    return _.findWhere(graphs, {id: graphId});
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register((action) => {
    var targetGraph;
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
        targetGraph = GraphStore.getGraphById(action.payload.graphId);
        var newPoint = _.pick(action.payload, 'xPos', 'yPos');
        targetGraph.points.push(newPoint);
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.ADD_LINE:
        var line = _.pick(action.payload, 'constant', 'slope');
        targetGraph = GraphStore.getGraphById(action.payload.graphId);
        targetGraph.lines.push(line);
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.PROCESS_GRAPH:
        targetGraph = GraphStore.getGraphById(action.payload.graphId);
        targetGraph.lines = [];
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.SET_GRAPH_PROPERTIES:
        targetGraph = GraphStore.getGraphById(action.payload.graphId);
        targetGraph.chartInfo = action.payload.properties;
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
      maxY: 100,
      titleX: 'X Axis',
      titleY: 'Y Axis',
      title: 'Chart'
    }
  };
  return newGraph;
}

module.exports = GraphStore;
