var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var GraphStore = require('./GraphStore');

var GraphActions = require('../actions/GraphActions');
var LinearRegressionProcessActions = require('../actions/LinearRegressionProcessActions');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var workerByGraphId = {};

var LinearRegressionProcessStore = assign({}, EventEmitter.prototype, {
  getIdsOfGraphsBeingProcessed() {
    return Object.keys(workerByGraphId);
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
      case Constants.ACTIONS.PROCESS_GRAPH:
        AppDispatcher.waitFor([GraphStore.dispatcherIndex]);
        startWorkerForGraph(action.payload.graphId);
        LinearRegressionProcessStore.emitChange();
        break;
      case Constants.ACTIONS.REMOVE_GRAPH:
      case Constants.ACTIONS.PROCESS_GRAPH_COMPLETE:
        var {graphId} = action.payload;
        if (graphId in workerByGraphId) {
          terminateAndRemoveProcessForGraph(graphId);
          LinearRegressionProcessStore.emitChange();
        }
        break;
    }

    return true;
  })
});

function startWorkerForGraph(graphId) {
  workerByGraphId[graphId] && workerByGraphId[graphId].terminate();

  var graph = GraphStore.getGraphById(graphId);

  var worker = new Worker('/src/js/workers/LinearRegressionCalculator.js');

  worker.onmessage = (results) => {
    var {line, complete} = JSON.parse(results.data);
    GraphActions.addLine(graphId, line.constant, line.slope);
    if (complete) {
      LinearRegressionProcessActions.processingComplete(graphId);
    }
  };

  worker.postMessage(JSON.stringify({points: graph.points}));

  workerByGraphId[graphId] = worker;
}

function terminateAndRemoveProcessForGraph(graphId) {
  workerByGraphId[graphId] && workerByGraphId[graphId].terminate();
  delete workerByGraphId[graphId];
}

module.exports = LinearRegressionProcessStore;