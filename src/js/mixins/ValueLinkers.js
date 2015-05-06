'use strict';

var _ = require('lodash');

function numberLinkState (propertyName) {
  return {
    value: this.state[propertyName],
    requestChange: (value) => {
      if(!_.isNaN(value)) {
        this.setState({
          [propertyName]: parseFloat(value)
        });
      }
    }
  };
}

module.exports = {
  numberLinkState: numberLinkState
};
