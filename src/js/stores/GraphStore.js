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
      case Constants.ACTIONS.PROCESS_GRAPH:
        var graph = GraphStore.getGraphById(action.payload.graphId);
        graph.lines = [];
        GraphStore.emitChange();
        break;
      case Constants.ACTIONS.SET_GRAPH_PROPERTIES:
        var graph = GraphStore.getGraphById(action.payload.graphId);
        graph.chartInfo = action.payload.properties;
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
