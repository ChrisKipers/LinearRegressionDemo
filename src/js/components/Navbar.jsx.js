var React = require('react');

var AppActions = require('../actions/AppActions');
var GraphActions = require('../actions/GraphActions');

var NavBar = React.createClass({
  render() {
    return (
      <nav className="navbar">
        <span className="navbar__title">Linear Regression Demo</span>
        <span className="navbar__actions">
          <span className="navbar__action" onClick={GraphActions.createGraph}>New Graph</span>
          <span className="navbar__action" onClick={this._showHistory}>History</span>
        </span>
      </nav>
    );
  },
  _showHistory() {
    AppActions.setGraphHistoryOpenState(true);
  }
});

module.exports = NavBar;