var React = require('react');
var App = require('./components/App.jsx');
var GraphActions = require('./actions/GraphActions');

GraphActions.createGraph();

React.render(
  React.createElement(App, null),
  document.getElementById('app')
);