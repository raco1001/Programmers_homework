const express = require('express')
const app = express()

app.listen(3000)


// https://www.youtube.com/@Ino-KHK
let youtuber1 = {
   channelTitle : "/no",
   sub : "12",
   videoNum: "200"
}


// https://www.youtube.com/@hyperdrivesound
let youtuber2 = {
   channelTitle : "Hyperdrive Boogie",
   sub : "2",
   videoNum: "90"
}


//https://www.youtube.com/@homealoneagain.
let youtuber3 = {
   channelTitle : "home alone.",
   sub : "2",
   videoNum: "50"
}



app.get('/:nickname', function (req, res) {
  const {nickname} = req.params;

   if (nickname === "@Ino-KHK"){
      res.json(youtuber1);
   } else if (nickname === "@hyperdrivesound"){
      res.json(youtuber2);
   } else if (nickname === "@homealoneagain."){ 
      res.json(youtuber3);
   } else {
      res.json(
         {
            message: "알려지지 않은 유튜버 입니다."
         }
      )
   }
   
})

