const express = require('express')
const app = express()

app.listen(3000)


app.get('/',(req,res)=>{
   res.send('Hello World!');
})


app.use(express.json());
app.post('/test', function (req,res) {

   console.log(req.body.message);


   res.send('');
})
