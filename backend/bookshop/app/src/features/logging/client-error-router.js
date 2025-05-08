const express = require('express')
const router = express.Router()
const db = require('../../database/mariadb')

router.post('/', async (req, res) => {
  const { error, stack, userAgent, url } = req.body
  try {
    await db.execute(
      `INSERT INTO client_errors (error_message, stack_trace, user_agent, url, timestamp) VALUES (?, ?, ?, ?, NOW())`,
      [error, stack, userAgent, url],
    )
    res.sendStatus(201)
  } catch (err) {
    console.error('Client Error Logging Failed:', err)
    res.sendStatus(500)
  }
})

module.exports = router
