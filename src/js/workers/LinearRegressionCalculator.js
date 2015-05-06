'use strict';

var RATE = 0.0001;
var REPORT_EVER_N_ITERATION = 100000;

this.onmessage = function (e) {
  var message = JSON.parse(e.data);
  var points = message.points;
  var convergence = false;
  var iteration = 0;
  var y = 0,
    x = 0;
  while(!convergence) {
    var hypothesisFn = createHypothesisFunction(y, x);
    var newY = calculateNewVariable(constantDerivativeFn, hypothesisFn, points, y);
    var newX = calculateNewVariable(slopeDerivativeFn, hypothesisFn, points, x);

    convergence = newY === y && newX === x;
    y = newY;
    x = newX;

    if (convergence) {
      postLine(y, x, true);
    } else if (iteration % REPORT_EVER_N_ITERATION === 0) {
      postLine(y, x, false);
    }
    iteration++;

  }
};

function postLine(constant, slope, complete) {
  var message = {line: {constant: constant, slope: slope}, complete: complete};
  this.postMessage(JSON.stringify(message));
}

function sumAndDivideByCount(numbers) {
  var total = numbers.reduce(function(sum, x) {
    return sum + x;
  }, 0);
  return total / (numbers.length);
}

function createHypothesisFunction(constant, slope) {
  return function (xPos) {
    return constant + slope * xPos;
  };
}

function constantDerivativeFn(hypFn, y, x) {
  return hypFn(x) - y;
}

function slopeDerivativeFn(hypFn, y, x) {
  return (hypFn(x) - y) * x;
}

function calculateNewVariable(derivativeFunction, hypothesisFn, points, orgVal) {
  var constantCalcs = points.map(function(point) {
    return derivativeFunction(hypothesisFn, point.yPos, point.xPos);
  });
  var constantSum = sumAndDivideByCount(constantCalcs);
  return orgVal - RATE * constantSum;
}
