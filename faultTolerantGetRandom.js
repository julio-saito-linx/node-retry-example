var retry = require('retry');
var get10orError = require('./get10orError');

module.exports = function faultTolerantGetRandom(opts, cb) {

  // show timeouts array
  if (opts.showTimeoutsArray) {
    var timeoutsArray = retry.timeouts(opts);
    /**/console.log('\n>>---------\n timeoutsArray:\n',/*-debug-*/
    /**/  require('util').inspect(timeoutsArray, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
  }

  var startTime = new Date();

  // setInterval
  var totalSeconds = 0;
  console.log(totalSeconds + 's');
  var tid = setInterval(function() {
    totalSeconds++;
    console.log(totalSeconds + 's');
    if (totalSeconds * 1000 >= opts.maxTotalTimeout) {
      // TODO: should we kill process here
      console.log('clearInterval(tid)');
      clearInterval(tid);
    }
  }, 1000);

  // retry.operation
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

      console.log('clearInterval(tid)');
      clearInterval(tid);

      cb(operation.mainError(), operation.errors(), resultString);
    });
  });
};
