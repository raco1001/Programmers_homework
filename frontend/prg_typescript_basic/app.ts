// 변수의 데이터 타입 명시
let stdId: number = 1111
let stdName: string = 'John'
let age: number = 20
let gender: string = 'Male'
let course: string = 'Typescript'
let score: number = 100
let completed: boolean = false

let student = {}

// 함수의 데이터 타입 명시 (매개변수 타입, 반환 타입)
function Plus(a: number, b: number): number {
  return a + b
}

let std = {
  stdId: 4385,
  stdName: 'Clerk',
  age: 45,
  gender: 'Male',
  course: 'Typescript',
  grade: 'A',
}

type Gender = 'Male' | 'Female'

interface Student {
  stdId?: number
  stdName?: string
  age?: number
  gender?: Gender
  course?: string
  grade?: string
  // setName = (name: string): void
  setName?: (name: string) => void
  getName?: () => string
}

class MyStudent implements Student {
  stdId: number
  stdName: string
  age: number
  gender: Gender
  course: string
  grade: string

  constructor() {
    this.stdId = 32469
    this.stdName = 'Clerk'
    this.age = 45
    this.gender = 'Male'
    this.course = 'Typescript'
    this.grade = 'A'
  }
  setName(name: string): void {
    this.stdName = name
    console.log('이름 설정', this.stdName)
  }
  getName(): string {
    return this.stdName
  }
}

const myInstance = new MyStudent()
myInstance.setName('Alice')

console.log(myInstance.getName())
console.log(myInstance.gender)

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

const user: {
  name: string
  age: number
  gender: 'Male' | 'Female'
} = {
  name: 'John',
  age: 20,
  gender: 'Male',
}

const user2: {
  name: string
  age: number
  gender: 'Male' | 'Female'
} = {
  name: 'John',
  age: 20,
  gender: 'Male',
}

let anyVal: number | string = 100
anyVal = 200
anyVal = 'Hello'

type numOrStr = number | string
let numStr: numOrStr = '100'
let item: number

function convertToNumber(value: numOrStr): number {
  if (typeof value === 'number') {
    item = value
  } else {
    item = 0
  }
  return item
}

function convertToString(value: numOrStr): string {
  return String(value)
}

console.log(convertToString(100))
console.log(convertToString('Hello'))

console.log(convertToNumber(100))
console.log(convertToNumber('Hello'))

let numbers: number[] = [1, 2, 3, 4, 5]

let fruits: string[] = ['Apple', 'Banana', 'Cherry']

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i])
}

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i])
}

let arr: (number | string)[] = [1, 'Hello']

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

let infer = [1, 2, 3] // 타입 추론
for (let i = 0; i < infer.length; i++) {
  console.log(infer[i])
}

let readOnly: ReadonlyArray<number> = [1, 2, 3]

for (let i = 0; i < readOnly.length; i++) {
  console.log(readOnly[i])
}

let greeting: [number, string, boolean] = [1, 'Hello', true]

for (let i = 0; i < greeting.length; i++) {
  console.log(greeting[i])
}

let [num, str, bool] = greeting

// Spread Operator
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let combineArr = [...arr1, ...arr2]

console.log(combineArr)

for (let i = 0; i < combineArr.length; i++) {
  console.log(combineArr[i])
}
