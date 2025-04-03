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
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 32469;
        this.stdName = 'Clerk';
        this.age = 45;
        this.gender = Gender.Male;
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
