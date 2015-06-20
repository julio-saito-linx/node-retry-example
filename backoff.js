#!/usr/bin/env node
var argv = process.argv.slice(2);
var wait = argv[0] || 10;
var method = argv[1];
if (!method) {
  method = 'fibonacci';
} else if (method !== 'fibonacci' && method !== 'exponential') {
  console.log('method invalid:', method);
  console.log('use `exponential` or `fibonacci`');
  process.exit(1);
}

wait = wait * 1000;
var backoff = require('backoff');
var sum = 0;
var exp = backoff[method]({
  randomisationFactor: 0.4,
  initialDelay: 100,
  maxDelay: wait
});

console.log('Wait', wait + 'ms', 'with method', method);

exp.on('backoff', function(number, delay) {
  var timeout = sum;
  sum += delay;
  if (sum < wait) {
    console.log('Backoff start:', number, delay + 'ms');
  } else {
    exp.emit('fail', new Error('Timeout ' + timeout + 'ms'), timeout);
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
