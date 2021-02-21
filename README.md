
# apelog

Simple but feature rich fast logger for apes 

It does not do fancy things,but it does have the all core functionality that you actually use:

## Features

* Log things at a given level (trace/debug/info/warn/error) to the standard output
* Filter logging by level or even turn off
* Color outputs
* Accept any number of arguments as input
* Object deserialization (fast)
* Handy Pretty Printing (Slow, but good for debugging (optional))
* Single file, only few carefully choosen dependencies, total ~100 lines of code

### Ape Mentality

This is for the people who get things done fast, no time to learn the 1000s options availalbe for a logger or to mess around why logging isn't working. Apelog is really simple and you can easily hack to the core anyway you like. (Ive created this for Nodejs, haven't tested on browser)

## Installation

#### NPM
Use the package manager npm to install apelog.

```bash
npm i apelog
```

## Usage
```javascript
const Logger = require('apelog')
const log = new Logger('backend-api')

log.info('An info message')

//output
//2021-02-21 15:10:11 [INFO] [BACKEND-API] An info message
```

### Available methods
```javascript
log.trace('An trace message')
log.debug('An debug message')
log.info('An info message')
log.warn('An warn message')
log.error('An error message')
```

### Set the log level (filter)
```javascript
const log = new Logger('backend-api')
log.setLogLevel('trace')

// in one step
const log = new Logger('backend-api').setLogLevel('error') // Will not print anything below error
```

### Or completly turn off logging for modules
```javascript
log.setLogLevel('off')
```

### Pass any number of arguments as logs
```javascript
log.debug('You', 'can', 'add', 'multiple', 'args')

// output
// 2021-02-21 15:28:13 [DEBUG] [BACKEND-API] You can add multiple args
```

### even objects (apelog will automatically stringify object the fastest way)
```javascript
log.debug('You', 'can', 'add', 'multiple', 'args', 'even object', {
  make: 'Ford',
  model: 'Mustang',
  year: 1969
})

// output
// 2021-02-21 15:28:13 [DEBUG] [BACKEND-API] You can add multiple args even an object {"make":"Ford","model":"Mustang","year":1969}
```

### Handy Pretty Print option to debug huge objects (not so fast, just handy)
```javascript
log.pp({
  make: 'Ford',
  model: 'Mustang',
  year: 1969
})

// output
// make:  Ford
// model: Mustang
// year:  1969
```

## Configurations

### Pass an options object, available options below
```javascript
const log = new Logger('backend-api', { 
  level: 'trace', // an alias of log.setLogLevel('trace') | Default trace
  throwOnError: false, // Exit when log.error() happens | Default false
  colorEntireLine: true // Color entire log line, | Default only meta info is colored
})
```

## Benchmark
I've tested this on a 10th gen i7 to log 10000 lines, not so bad for a aping library.

PS: for reference, only pino is faster. but apelog is faster than log4j & winston (the only one i have tested)

```javascript
log.info('normal string') // 675ms
log.info('You', 'can', 'add', 'multiple', 'args') //672ms
log.debug('You', 'can', 'add', 'multiple', 'args', 'even an object', hugeObject) // 1086ms
```

## Todo
- [ ] Attach screenshots  

