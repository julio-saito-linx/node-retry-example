# node-retry-example
--------------------

## with azk

```sh
# enter on shell
azk shell

# execute node
root@5fbfbeea1b1e:/azk/example# node index.js
```

## with node instaled

```sh
npm i
node index.js
```


#### backoff

##### Usage:

```
$ ./backoff.js [wait [method]]
wait: seconds to wait. default=10
method: `fibonacci` or `exponential`. default=fibonacci
```

##### Examples:

```shell
$ ./backoff.js 5
Wait 5000ms with method fibonacci
Backoff start: 0 120ms
Backoff done:  0 120ms => 120ms
Backoff start: 0 132ms
Backoff done:  1 132ms => 252ms
Backoff start: 1 218ms
Backoff done:  2 218ms => 470ms
Backoff start: 2 397ms
Backoff done:  3 397ms => 867ms
Backoff start: 3 609ms
Backoff done:  4 609ms => 1476ms
Backoff start: 4 951ms
Backoff done:  5 951ms => 2427ms
Backoff start: 5 1380ms
Backoff done:  6 1380ms => 3807ms
Timeout 3807ms
```

```shell
$ ./backoff.js 7 exponential
Wait 7000ms with method exponential
Backoff start: 0 107ms
Backoff done:  0 107ms => 107ms
Backoff start: 0 221ms
Backoff done:  1 221ms => 328ms
Backoff start: 1 531ms
Backoff done:  2 531ms => 859ms
Backoff start: 2 989ms
Backoff done:  3 989ms => 1848ms
Backoff start: 3 2168ms
Backoff done:  4 2168ms => 4016ms
Timeout 4016ms
```
