const express = require('express')
const app = express()

app.listen(3000)



app.get('/hello', function (req, res) {
  res.send({say : '안녕하세요'})
})


app.get('/bye', function (req, res) {
  res.send({say : '안녕히 계세요'})
})


app.get('/nicetomeetyou', function (req, res) {
  res.send({say : '만나서 반가워요'})
})




