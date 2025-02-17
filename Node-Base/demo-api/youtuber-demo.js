const express = require('express')
const app = express()

app.listen(3000)


let db = new Map();
let id = 1;

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


db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// db.set(id, `youtuber${id}`)

// console.log(JSON.stringify(Object.fromEntries(db)));

// const dbJson = Object.fromEntries(db);
const dbJson = JSON.stringify(Object.fromEntries(db));
app.get('/youtubers',(req,res)=>{
   res.json(dbJson);
})



app.get('/youtuber/:id', function (req, res) {
   let {id} = req.params;
   id = parseInt(id);
   const youtuber = db.get(id);

   if(youtuber == undefined){
      res.json({
         id : id,
         productName : "값이 존재하지 않습니다."
      })
   }else{
      product = db.get(id);
      // product.id = id;
      product["id"] = id;
      res.json(
      product
      );
   }
})


app.use(express.json()); // 미들웨어: json 설정
app.post('/youtuber',  (req,res) => {
   console.log(req.body);

   db.set(id++,req.body);

   res.json({
      message: `${db.get(id - 1).channelTitle} 유튜버가 신규 등록되었습니다!!`
   });
})
