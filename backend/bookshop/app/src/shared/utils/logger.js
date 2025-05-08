const fs = require('fs')
const path = require('path')

const logPath = path.join(__dirname, '../../../logs/app.log')

function logEvent(message, meta = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    type: 'user-event',
    eventName: message,
    ...meta,
  }

  fs.appendFileSync(logPath, JSON.stringify(log) + '\n')
}

module.exports = { logEvent }
