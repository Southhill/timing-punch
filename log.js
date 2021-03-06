const log4js = require('log4js')

log4js.configure({
    appenders: {
        console: { type: 'console' },
        punch: {
            type: 'file',
            filename: 'logs/punch.log',
            maxLogSize: 10 * 1024 * 1024, // 10Mb
            encoding: 'utf-8',
            flag: 'w+'
        },
        error: {
            type: 'file',
            filename: 'logs/error.log',
            maxLogSize: 10 * 1024 * 1024,
            encoding: 'utf-8',
            flag: 'w+'
        }
    },
    replaceConsole: true,
    pm2: true,
    categories: {
        default: { appenders: ['console'], level: 'info' },
        punch: { appenders: ['punch'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
    }
})

exports.logger = log4js.getLogger('punch')
exports.errorLogger = log4js.getLogger('error')
