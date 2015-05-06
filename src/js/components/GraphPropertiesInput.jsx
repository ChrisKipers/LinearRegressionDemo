'use strict';

var React = require('react/addons');
var _ = require('lodash');

var GraphActions = require('../actions/GraphActions');

var ValueLinkers = require('../mixins/ValueLinkers');

var chartPropertyFieldNames = ['title', 'titleX', 'minX', 'maxX', 'titleY', 'minY', 'maxY'];

var GraphPropertiesInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ValueLinkers],
  getInitialState() {
    return getFieldValuesFromObject(this.props);
  },
  componentWillReceiveProps(newProps) {
    if (shouldUpdateState(this.props, newProps)) {
      this.setState(getFieldValuesFromObject(newProps));
    }
  },
  render() {
    return (
      <div>
        <h2>Graph Properties</h2>
        <form onSubmit={this._submitChanges}>
          <label for="graph-label">Graph Label</label>
          <input type="text" id="graph-label" valueLink={this.linkState('title')} />
          <label for="xaxis-label">X Axis Label</label>
          <input type="text" id="xaxis-label" valueLink={this.linkState('titleX')} />
          <label for="xaxis-min">X Axis Min</label>
          <input type="number" id="xaxis-min" valueLink={this.numberLinkState('minX')} />
          <label for="xaxis-max">X Axis Max</label>
          <input type="number" id="xaxis-max" valueLink={this.numberLinkState('maxX')} />
          <label for="yaxis-label">Y Axis Label</label>
          <input type="text" id="yaxis-label" valueLink={this.linkState('titleY')} />
          <label for="yaxis-min">Y Axis Min</label>
          <input type="number" id="yaxis-min" valueLink={this.numberLinkState('minY')} />
          <label for="yaxis-max">Y Axis Max</label>
          <input type="number" id="yaxis-max" valueLink={this.numberLinkState('maxY')} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  },
  _submitChanges(e) {
    e.preventDefault();
    GraphActions.setGraphProperties(this.props.graph.id, this._getNewChartInfoFromForm());
  },
  _getNewChartInfoFromForm() {
    return _.pick(this.state, ...chartPropertyFieldNames);
  }
});

function getFieldValuesFromObject(obj) {
  return _.pick(obj.graph.chartInfo, ...chartPropertyFieldNames);
}

function shouldUpdateState(oldProps, newProps) {
  var oldFieldValues = getFieldValuesFromObject(oldProps);
  var newFieldValues = getFieldValuesFromObject(newProps);
  return !_.isEqual(oldFieldValues, newFieldValues);
}


module.exports = GraphPropertiesInput;
