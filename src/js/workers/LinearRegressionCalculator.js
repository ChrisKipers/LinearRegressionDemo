'use strict';
/*global onmessage:true*/

const RATE = 0.0001,
  REPORT_EVER_N_ITERATION = 100000;

onmessage = function (e) {
  const {points} = JSON.parse(e.data);
  var convergence = false,
    iteration = 0,
    constant = 0,
    slope = 0;

  while(!convergence) {
    let hypothesisFn = createHypothesisFunction(constant, slope);
    let newConstant = calculateNewVariable(constantDerivativeFn, hypothesisFn, points, constant);
    let newSlope = calculateNewVariable(slopeDerivativeFn, hypothesisFn, points, slope);

    convergence = newConstant === constant && newSlope === slope;
    constant = newConstant;
    slope = newSlope;

    if (convergence || iteration % REPORT_EVER_N_ITERATION === 0) {
      let response = {line: {constant: constant, slope: slope}, complete: convergence};
      this.postMessage(JSON.stringify(response));
    }

    iteration++;
  }
};

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
