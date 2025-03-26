const express = require('express')
const cookieParser = require('cookie-parser');

const app = express()

app.use(cookieParser());
app.use(express.json());

app.listen(3000)


app.get('/',(req,res)=>{
   res.send('Hello World!');
})



app.post('/test', function (req,res) {

   console.log(req.body.message);


   res.send('');
})
