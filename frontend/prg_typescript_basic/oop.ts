// 일반적인 직원 정보
class Employee {
  constructor(
    private _empName: string,
    private _empAge?: number,
    private _empJob?: string,
  ) {}

  get getEmpName() {
    return this._empName
  }

  set setEmpName(empName: string) {
    this._empName = empName
  }

  printEmp = (): void => {
    console.log(
      `이름: ${this._empName}, 나이: ${this._empAge}, 직업: ${this._empJob}`,
    )
  }
}

const employee = new Employee('홍길동', 20, '개발자')
employee.setEmpName = '김갑환'

employee.printEmp()
