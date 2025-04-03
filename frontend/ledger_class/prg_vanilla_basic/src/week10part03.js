console.log(a)
try {
  console.log(b)
  console.log(c)
} catch (error) {}
var a = 1
const b = 2
let c

/*
1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있다
2. 자바스크립트 함수는 함수의 반환값이 될 수 있다.
3. 자바스크립트 함수는 할당명령문의 대상이 될 수 있다.
4. 자바스크립트 함수는 동일비교의 대상이 될 수 있다.
*/

//1
function greet(name) {
  console.log(`Hello, ${name}!`)
}

function execute(fn) {
  fn('Yoon')
}

execute(greet)

//2
function makeMultiplier(x) {
  return function (y) {
    return x * y
  }
}

const double = makeMultiplier(2)
console.log(double(5))

//3
const sayHi = function () {
  console.log('Hi there!')
}

sayHi()

//4
function hello() {
  console.log('Hello!')
}

const a = hello
const b = hello

console.log(a === b)

/*
1. 기본값 매개변수 default function parameter
2. 나머지 매개변수 Rest parameter
3. arguments 객체
*/

//1
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`)
}

greet('Yoon')
greet()

//2
function sumAll(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}

console.log(sumAll(1, 2, 3))
console.log(sumAll(10, 20, 30))

//3
function showArgs() {
  console.log(arguments)
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argument ${i}:`, arguments[i])
  }
}

showArgs('a', 'b', 'c')
