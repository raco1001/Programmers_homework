const express = require('express')
const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.send([
      { id: 0, name: '동화' },
      { id: 1, name: '소설' },
      { id: 2, name: '사회' },
    ])
  })
  .post((req, res) => {
    res.send({
      id: 4,
      name: req.body.name,
    })
  })

module.exports = router
