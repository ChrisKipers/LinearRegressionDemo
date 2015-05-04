var React = require('react');
var cx = require('react/addons').addons.classSet;

var LineList = React.createClass({
  render: function() {
    var lineComponents = this.props.lines.map((line, index) => {
      var classes = cx({
        'linelist__item': true,
        'linelist__item--selected': index === this.props.currentLineIndex
      });
      return (
        <li key={index} onClick={this.props.onClick} data-line-index={index} className={classes}>
          <span>{line.constant}</span> + <span>{line.slope}x</span>
        </li>
      )
    });

    return (
      <div className="linelist">
        <ul>
          {lineComponents}
        </ul>
      </div>
    );
  }
});

module.exports = LineList;