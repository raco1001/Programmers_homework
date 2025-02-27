/*var vs let vs vonst */

function compareVariable() {
  // /*let 으로 선언한 변수는 값을 다시 할당할 수 있다.*/
  // let num1 = 10;
  // num1 = 20;
  // alert("num1 = " + num1);
  //   /*const 로 선언한 변수는 값을 다시 할당할 수 없다. */
  //   let num1 = 10;
  //   const num2 = 30;
  //   num2 = 20; // error
  //   alert("num1 = " + num2);
}

/* ID란에 입력된 값을 팝업창에 띄우기 */
function popId() {
  let userId = document.getElementById("txt_id").value;

  if (userId) {
    alert("ID: " + userId);
  } else {
    alert("ID를 입력하세요.");
    return;
  }
}

/* 나만의 함수 만들고, 버튼 클릭하면 호출하기 */
function myFunction() {
  alert("1");
  alert("2");
  alert("3");
}
