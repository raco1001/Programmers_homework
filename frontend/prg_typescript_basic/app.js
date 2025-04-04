var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 변수의 데이터 타입 명시
var stdId = 1111;
var stdName = 'John';
var age = 20;
var gender = 'Male';
var course = 'Typescript';
var score = 100;
var completed = false;
var student = {};
// 함수의 데이터 타입 명시 (매개변수 타입, 반환 타입)
function Plus(a, b) {
    return a + b;
}
var std = {
    stdId: 4385,
    stdName: 'Clerk',
    age: 45,
    gender: 'Male',
    course: 'Typescript',
    grade: 'A',
};
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 32469;
        this.stdName = 'Clerk';
        this.age = 45;
        this.gender = 'Male';
        this.course = 'Typescript';
        this.grade = 'A';
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('이름 설정', this.stdName);
    };
    MyStudent.prototype.getName = function () {
        return this.stdName;
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName('Alice');
console.log(myInstance.getName());
console.log(myInstance.gender);
// function getInfo(id: number, status?: string): Student {
//   return {
//     stdId: id,
//     stdName: 'John',
//     age: 20,
//     gender: 'Male',
//     course: 'Typescript',
//   }
// }
// function setInfo(student: Student): void {
//   console.log(student)
// }
// setInfo(std)
var user = {
    name: 'John',
    age: 20,
    gender: 'Male',
};
var user2 = {
    name: 'John',
    age: 20,
    gender: 'Male',
};
var anyVal = 100;
anyVal = 200;
anyVal = 'Hello';
var numStr = '100';
var item;
function convertToNumber(value) {
    if (typeof value === 'number') {
        item = value;
    }
    else {
        item = 0;
    }
    return item;
}
function convertToString(value) {
    return String(value);
}
console.log(convertToString(100));
console.log(convertToString('Hello'));
console.log(convertToNumber(100));
console.log(convertToNumber('Hello'));
var numbers = [1, 2, 3, 4, 5];
var fruits = ['Apple', 'Banana', 'Cherry'];
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
for (var i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
var arr = [1, 'Hello'];
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
var infer = [1, 2, 3]; // 타입 추론
for (var i = 0; i < infer.length; i++) {
    console.log(infer[i]);
}
var readOnly = [1, 2, 3];
for (var i = 0; i < readOnly.length; i++) {
    console.log(readOnly[i]);
}
var greeting = [1, 'Hello', true];
for (var i = 0; i < greeting.length; i++) {
    console.log(greeting[i]);
}
var num = greeting[0], str = greeting[1], bool = greeting[2];
// Spread Operator
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var combineArr = __spreadArray(__spreadArray([], arr1, true), arr2, true);
console.log(combineArr);
for (var i = 0; i < combineArr.length; i++) {
    console.log(combineArr[i]);
}
