var faultTolerantGetRandom = require('./faultTolerantGetRandom');

// start timer
console.time('timespent');

// retry options
var opts = {
  retries: 100,
  factor: 1.03,
  minTimeout: 5,
  maxTimeout: 100,
  randomize: true,

  maxTotalTimeout: 2000,
  showTimeoutsArray: false
};

var wait = 20;
opts = {
  minTimeout: 1 * 1000,
  maxTimeout: wait * 1000,
  randomize: true
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
