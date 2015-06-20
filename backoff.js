#!/usr/bin/env node
var method = process.argv.slice(2)[0];
if (method !== 'fibonacci' && method !== 'exponential') {
  console.log('method invalid:', method);
  console.log('use `exponential` or `fibonacci`');
  process.exit(1);
}
var backoff = require('backoff');
var sum = 0;
var wait = 10 * 1000;
var exp = backoff[method]({
  randomisationFactor: 0.4,
  initialDelay: 100,
  maxDelay: wait
});


console.log('Wait', wait + 'ms');

exp.on('backoff', function(number, delay) {
  var timeout = sum;
  sum += delay;
  if (sum < wait) {
    console.log('Backoff start:', number, delay + 'ms');
  } else {
    exp.emit("fail", new Error('Timeout ' + timeout + 'ms'), timeout);
    exp.reset();
  }
});

exp.on('ready', function(number, delay) {
  console.log('Backoff done: ', number, delay + 'ms', '=>', sum + 'ms');
  exp.backoff();
});

exp.on('fail', function(err) {
  console.log(err.message);
  process.exit(1);
});

exp.backoff();
