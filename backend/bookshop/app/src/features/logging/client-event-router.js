const express = require('express')
const router = express.Router()
const { logEvent } = require('../../shared/utils/logger')
const { checkAccessToken } = require('./log-middleware')

router.post('/', checkAccessToken, (req, res) => {
  const { eventName, payload, url, userAgent, timestamp } = req.body
  logEvent(eventName, {
    ...payload,
    url,
    userAgent,
    frontendTimestamp: timestamp,
    timestamp: new Date().toISOString(),
    type: 'user-event',
    userId: req.userId,
    userEmail: req.userEmail,
  })

  logEvent(JSON.stringify(logEvent))
  res.sendStatus(200)
})

module.exports = router
