const express = require('express')
const app = express()

app.listen(3000)


app.get('/test', function (req, res) {
  res.json({
   title:'Node.js를 배워보자',
   price: 20000,
   description: '좋은 책'
   })
})


app.get('/test/1', function (req, res) {
  res.json({
   title:'Node.js를 배워보자',
   price: 20000,
   description: '좋은 책'
   })
})