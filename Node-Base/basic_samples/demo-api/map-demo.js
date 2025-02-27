const express = require('express');
const app =express();
app.listen(3000);

app.get('/:id',function (req,res) {
   let {id} = req.params;
   id = parseInt(id);

   if(db.get(id) == undefined){
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



let db = new Map();

let notebook = {
   productName: "Notebook",
   price: 2000000
}

let mouse = {
   productName: "Mouse",
   price: 100000
}

let monitor = {
   productName: "Monitor",
   price: 200000
}

let speaker = {
   productName: "Speaker",
   price: 120000
}
db.set(1,notebook);
db.set(2,mouse);
db.set(3,monitor);
db.set(4,speaker)

console.log(db);
console.log(db.size);
console.log([...db]);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
console.log(db.get(4));