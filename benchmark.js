const Logger = require('./index')
const log = new Logger('benchmark')

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const nestedObjt = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969,
    good: 'yeah'
};

let results = []

suite
  .add('normal string', function () {
    log.info('normal string')
  })
  .add('Multiple args parse', function () {
    log.info('You', 'can', 'add', 'multiple', 'args')
  })
  .add('Object stringify', function () {
    log.info('You', 'can', 'add', 'multiple', 'args', 'even an object', nestedObjt)
  })
  .on('cycle', function (e) {
    results.push(String(e.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();

console.info(results)
