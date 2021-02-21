"use strict"

const chalk = require('chalk')
const prettyjson = require('prettyjson')
const safeStringify = require('fast-safe-stringify')
const DateFormat = require('fast-date-format');
const dateFormat = new DateFormat('YYYY-MM-DD HH:mm:ss');

const options = {
    keysColor: 'yellow',
    stringColor: 'green',
    numberColor: 'red'
}

class Logger {
    constructor(name, options = {}) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('You must supply a name when creating a logger.')
        }

        this.name = name.toUpperCase()
        this.level = options.level || 'trace'
        this.throwOnError = options.throwOnError || false // Exit when error occures, be careful if you exit early not all errors are printed
        this.colorEntireLine = options.colorEntireLine || true // color the entire log line, if set to false only meta will be colored
        this.levels = ['trace', 'debug', 'info', 'warn', 'error', 'off']
        this.colors = ['grey', 'cyan', 'greenBright', 'yellowBright', 'red', 'grey']
    }

    _getColor(level) {
        return this.colors[this.levels.indexOf(level)]
    }

    _shouldPrint(level) {
        return this.levels.indexOf(level) >= this.levels.indexOf(this.level)
    }

    _write(name, level, msgs) {

        if (this._shouldPrint(level)) {

            let logLine = '';

            for (const msg of msgs) {

                if (typeof msg === 'object') {
                    logLine += ' ' + safeStringify(msg)
                    continue
                }

                logLine += ' ' + msg

            }

            let color = this._getColor(level)

            let levelStr = level.toUpperCase()

            let timestamp = dateFormat.format() // It will take current timestamp is no date is passed

            let meta = `${timestamp} [${levelStr}] [${name}]`

            let finalString = chalk[color](meta) + `${logLine}`

            if (!this.colorEntireLine) {

                finalString = chalk[color](`${meta} ${logLine}`)
            }

            console.log(finalString) // for further extreme performance, write directly to stdout. (aware of the formatting tradeoffs)

            // process.stdout.write(finalString + '\n');

        }
    }

    setLogLevel(level) {
        this.level = level.toLowerCase()
        return this
    }

    getLogLevel() {
        return this.level
    }

    error(...msgs) {
        this._write(this.name, this.error.name, msgs)

        if (this.throwOnError) {
            throw new Error(msg)
        }
    }

    warn(...msgs) {
        this._write(this.name, this.warn.name, msgs)
    }

    info(...msgs) {
        this._write(this.name, this.info.name, msgs)
    }

    debug(...msgs) {
        this._write(this.name, this.debug.name, msgs)
    }

    trace(...msgs) {
        this._write(this.name, this.trace.name, msgs)
    }

    // Pretty print, for debugging, not performant
    pp(obj) {
        console.log(prettyjson.render(obj, options))
    }
}

module.exports = Logger
