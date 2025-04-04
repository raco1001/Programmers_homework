// 일반적인 직원 정보
var Employee = /** @class */ (function () {
    function Employee(_empName, _empAge, _empJob) {
        var _this = this;
        this._empName = _empName;
        this._empAge = _empAge;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log("\uC774\uB984: ".concat(_this._empName, ", \uB098\uC774: ").concat(_this._empAge, ", \uC9C1\uC5C5: ").concat(_this._empJob));
        };
    }
    Object.defineProperty(Employee.prototype, "getEmpName", {
        get: function () {
            return this._empName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "setEmpName", {
        set: function (empName) {
            this._empName = empName;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee('홍길동', 20, '개발자');
employee.setEmpName = '김갑환';
employee.printEmp();
