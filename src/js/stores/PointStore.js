var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Constants = require('../Constants');

var points = [];


var PointStore = assign({}, EventEmitter.prototype, {
  getPoints: function() {
    return points;
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
      case Constants.ACTIONS.ADD_POINT:
        points.push(action.payload);
        PointStore.emitChange();
        break;
    }

    return true;
  })

});

module.exports = PointStore;
