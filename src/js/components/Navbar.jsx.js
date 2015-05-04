var React = require('react');

var NavBar = React.createClass({
  render: function() {
    return (
      <nav className="navbar">
        <span className="navbar__title">Linear Regression Demo</span>
      </nav>
    );
  }
});

module.exports = NavBar;