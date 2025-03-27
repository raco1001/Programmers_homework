// Function Declaration

function add1(x,y){
   return x + y;
}


// Function Expression
let add2 = function(x,y){
   return x + y;
}


// Arrow Function
const add3 = (x, y) => {
   return x + y;
}

// Arrow Function - Implicit Return
var add4 = (x, y) => x + y;

console.log(add1(1,2));
console.log(add2(1,2));
console.log(add3(1,2));
console.log(add4(1,2));
