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


// const dbJson = JSON.stringify(Object.fromEntries(db));
app.get('/youtubers',(req,res)=>{
   res.json(Object.fromEntries(db));
})


app.get('/youtubers/:id', function (req, res) {
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
app.post('/youtubers',  (req,res) => {
   console.log(req.body);

   db.set(id++,req.body);

   res.json({
      message: `${db.get(id - 1).channelTitle} 유튜버가 신규 등록되었습니다!!`
   });
})


app.delete('/youtubers/:id',(req,res)=>{
   let {id} = req.params;
   id = parseInt(id);
   const youtuber = db.get(id);

   if(youtuber == undefined){
      res.json({
         message : `요청한 아이디 ${id}의 유튜버는 존재하지 않습니다.`
      })
   }else{
      db.delete(id);

      res.json({
         message: `${youtuber.channelTitle} 님 아쉽지만 다음에 또 다시 만나요!`
      })
   }
});



app.delete('/youtubers',(req,res)=>{
   
      if(db.size === 0){
         res.json({
            message : `삭제할 유튜버가 없습니다.`
         })
      }else{
      db.clear();

         res.json({
            message: `모든 유튜버가 삭제되었습니다.`
         })
   }

});


app.put('/youtubers/:id',(req,res)=>{
      let {id} = req.params;
      id = parseInt(id);
      console.log(id);
      const youtuber = db.get(id);
      console.log(youtuber);

      if(youtuber === undefined){
         res.json({
            message : `해당 유튜버가 존재하지 않습니다.`
         })
      }else{
         let oldTitle = youtuber.channelTitle;
         let newTitle = req.body.channelTitle;
         youtuber.channelTitle = newTitle;
         db.set(id, youtuber);
         res.json({
            message : `유튜버의 이름이 ${oldTitle}에서 ${newTitle}로 변경되었습니다.`
         })

   }

})