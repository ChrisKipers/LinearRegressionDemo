this.onmessage = function (e) {
  var points = e.data;
  this.postMessage({constant: 1, slope: 1});
};