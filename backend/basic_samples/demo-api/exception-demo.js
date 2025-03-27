const express = require('express')
const app = express()
app.listen(3000)


const arr = [
   {
      id: 1,
      name: 'apple',
   },
   {
      id: 2,
      name: 'orange',
   },
   {
      id: 3,
      name: 'strawberry',
   },
   {
      id: 4,
      name: 'blueberry',
   },
]

app.get('/fruits', (req,res) => {
   res.json(fruits);
})

