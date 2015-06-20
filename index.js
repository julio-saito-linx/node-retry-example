var faultTolerantGetRandom = require('./faultTolerantGetRandom');

// start timer
console.time('timespent');

// retry options
var maxWait = 5;
var opts = {
  retries: 100,
  factor: 1.2,
  minTimeout: 1 * 100,
  maxTimeout: maxWait * 1000,
  randomize: true,

  maxTotalTimeout: maxWait * 1000,
  showTimeoutsArray: false
};

faultTolerantGetRandom(opts, function(err, errors, resultString) {

  console.log('\n\n----THE END----\n');

  if (resultString) {
    console.log('SUCCESS!');
    console.log('errors count:', errors.length);
    console.log('resultString:', resultString);
  } else {
    console.log('FAIL');
    console.log('errors count:', errors.length);
    console.log('last err:', err);
  }

  console.log('\n');

  // end timer
  console.timeEnd('timespent');

});
