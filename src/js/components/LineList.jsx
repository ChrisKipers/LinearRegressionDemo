var React = require('react');
var cx = require('react/addons').addons.classSet;

var LineList = React.createClass({
  render: function () {
    var lineComponents = this.props.lines.map((line, index) => {
      var classes = cx({
        'linelist__item': true,
        'linelist__item--selected': index === this.props.currentLineIndex
      });
      return (
        <tr key={index} onClick={this.props.onClick} data-line-index={index} className={classes}>
          <td>{index}</td>
          <td>
            <span>{line.constant}</span>
            +
            <span>{line.slope}x</span>
          </td>
        </tr>
      )
    });

    return (
      <div className="linelist">
        <table>
          <thead>
            <tr>
              <td>Iteration</td>
              <td>Formula</td>
            </tr>
          </thead>
        {lineComponents}
        </table>
      </div>
    );
  }
});

module.exports = LineList;