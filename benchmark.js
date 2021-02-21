const Logger = require('./index')

const log = new Logger('backend-api', { 
  level: 'trace',
  throwOnError: false,
  colorEntireLine: true
})

const myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969,
    good: 'yeah'
};

const start = new Date();
const hrstart = process.hrtime();

for (let i = 0; i < 10000; i++) {
    // log.info('normal string') // 675ms
    // log.info('You', 'can', 'add', 'multiple', 'args') //672ms
    // log.debug('You', 'can', 'add', 'multiple', 'args', 'even an object', myCar) // 1086ms
}

const end = new Date() - start,
hrend = process.hrtime(hrstart);
console.info("Execution time: %dms", end);
console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);

