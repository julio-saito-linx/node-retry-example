module.exports = function get10orError(callback) {
  setTimeout(function() {
    var maybeTen = Math.floor(Math.random() * 100) + 1;

    if (maybeTen !== 10) {
      return callback(new Error('not 10: ' + maybeTen));
    }

    return callback(null, 'it\'s 10: \\o\/');
  }, 20);
};
