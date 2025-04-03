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

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

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
    this.gender = Gender.Male
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
