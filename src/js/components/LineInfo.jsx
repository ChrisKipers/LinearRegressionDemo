'use strict';

var React = require('react');

var LineInfo = React.createClass({
  render() {
    var {constant, slope} = this.props.line;
    var lineFormula = `${constant} + ${slope}x`;

    return (
      <div className="lineinfo">
        <span className="lineinfo__iteration"></span>
        <span className="lineinfo__formula">{lineFormula}</span>
      </div>
    );
  }
});

module.exports = LineInfo;
