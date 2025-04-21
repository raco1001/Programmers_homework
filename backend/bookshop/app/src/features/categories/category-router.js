const express = require('express')
const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.send([
      { id: 1, name: '전체' },
      { id: 2, name: '동화' },
      { id: 3, name: '소설' },
    ])
  })
  .post((req, res) => {
    res.send({
      id: 4,
      name: req.body.name,
    })
  })

module.exports = router
