const express = require('express')
const app = express()

app.listen(3000)

app.get('/', function (req, res) {
  res.send('Hello World!!!')
})

let nodejsBook = {
   title:'Node.js를 배워보자',
   price: 20000,
   description: '좋은 책'
   }

app.get('/products/1', function (req, res) {
  res.json(nodejsBook)
})


