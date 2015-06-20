var retry = require('retry');
var get10orError = require('./get10orError');

module.exports = function faultTolerantGetRandom(opts, cb) {

  // show timeouts array
  if (opts.showTimeoutsArray) {
    var timeoutsArray = retry.timeouts(opts);
    console.log(timeoutsArray.join('  '));
  }

  var startTime = new Date();

  var operation = retry.operation(opts);
  operation.attempt(function(currentAttempt) {

    // /**/console.log('\n>>---------\n this:\n',/*-debug-*/
    // /**/  require('util').inspect(this, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/

    console.log([
      ' [',
      this._attempts,
      '] timeout: ',
      this._timeouts[0],
      ' - ',
      this._errors[this._errors.length - 1]
    ].join(''));

    get10orError(function(err, resultString) {
      var currentDate = new Date();
      var timeElapsed = currentDate - startTime;

      if (timeElapsed >= opts.maxTotalTimeout) {
        var errorMessage = 'timeElapsed: ' + timeElapsed;
        return cb(new Error(errorMessage), operation.errors(), null);
      }

      if (operation.retry(err)) {
        return;
      }

      // if ( (new Date()) - start_time >= maxTotalTimeout) {
      //   return;
      // }

      cb(operation.mainError(), operation.errors(), resultString);
    });
  });
};
