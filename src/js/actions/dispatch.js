'use strict';

var AppDispatcher = require('../AppDispatcher');

module.exports = function (type, payload) {
  AppDispatcher.dispatch({
    actionType: type,
    payload: payload
  });
};
