const express = require('express')
const app = express()

app.listen(3000)


//https://www.youtube.com/@ChimChakMan_Official
//https://www.youtube.com/watch?v=-6mVGVBHM3g&t=745s

app.get('/watch', function (req, res) {


   const {v1, t} = req.query;

   console.log(v1);
   console.log(t);

   res.json({
      video : v1,
      timeline: t
   });
   
})

