const arr = [1,2,3,4,5];


// 1.forEach

// 변수 확인
const forEa인hArr = arr.forEach(function(a,b,c){
   console.log(`a: ${a} b: ${b} c:${c}`);
})

// 기초 예제
const fruits = ["🍎", "🍌", "🍇"];

fruits.forEach((fruit, index) => {
    console.log(`${index + 1}: ${fruit}`);
});

// 배열 다루기
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 }
];

users.forEach(user => {
    console.log(`${user.name} is ${user.age} years old.`);
});

// 누적 합계 계산 
const numbers = [10, 20, 30, 40, 50];
let sum = 0;

numbers.forEach(num => sum += num);

console.log(`Total sum: ${sum}`);


// 실전 예제

// a. DOM 요소 순회 및 변경
/*
<ul>
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
    <li class="item">Item 3</li>
</ul>

<script>
const items = document.querySelectorAll(".item");

items.forEach((item, index) => {
    item.style.color = "blue";
    item.textContent = `Updated Item ${index + 1}`;
});
</script>
*/

// b. 비동기 API호출

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    users.forEach(user => {
        console.log(`User: ${user.name}, Email: ${user.email}`);
    });
}

fetchUsers();



let map = new Map();
map.set(7, "seven")
map.set(8,"eight")
map.set(9,"nine")



// 2.map

const mapArr = arr.map((a)=>{
   return a *= 2;
})


const newArray = array.map(function(element, index, array) {
    return 변환된_값;
});

// 기본 예제
// a. 배열 요소 변환
const mapNumbers = [1, 2, 3, 4, 5];

const doubled = mapNumbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8, 10]

// b. 객체 배열 변환

const mapUsers = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 }
];

const userNames = mapUsers.map(user => user.name);

console.log(userNames); // ["Alice", "Bob", "Charlie"]



// 실전 예제
// a. 배열의 객체 속성 변환
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 }
];

const discountedProducts = products.map(product => ({
    name: product.name,
    price: product.price * 0.9 // 10% 할인 적용
}));

console.log(discountedProducts);
// [
//   { name: 'Laptop', price: 900 },
//   { name: 'Phone', price: 450 }
// ]



// b. HTML 요소 생성

/*
<ul id="user-list"></ul>

<script>
const users = ["Alice", "Bob", "Charlie"];

document.getElementById("user-list").innerHTML = users
    .map(user => `<li>${user}</li>`)
    .join(""); // 문자열 합치기
</script>

*/


// c. 비동기 데이터 변환
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const userEmails = users.map(user => user.email);

    console.log(userEmails); // ["Sincere@april.biz", "Shanna@melissa.tv", ...]
}

fetchUsers();


console.log(mapArr);