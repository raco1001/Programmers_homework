// 1단계  
/*
// 1. 게임 시작,종료 기능 --완료

// 2. 스트라이크, 볼 갯수만 표시 -- 완료

// 3. 필요한 로그 추가 -- 완료

// 4. 필요한 개수만큼 사용자가 입력할 수 있게 강제
   // 4-1. 모자라거나 많으면 입력 금지, 로그 표시 -- 완료

*/

// 2단계

/**
 * 시도횟수 (유저)
 * 시도횟수 (컴퓨터)
 * 
 */



// 3단계

/**
 * 최소 최대 시도횟수 저장 
 * 유저는 기본적으로 길이 2의 배열을 할당 받는다.
 *    이 배열에는 최소/최대 시도횟수 만 저장한다. [min, max]
 *       4     배열 길이가 0이다 -> [4]
 *       7     배열 길이가 1이다 -> 배열[0] 랑 크기 비교 -> [4,7]
 *       23    배열 길이가 2 이다 -> 배열[0] 보다 작아? no -> 배열[1] 보다 커? yes -> 배열[1]이 23 -> [4,23]
 *       4     [4,23]
 *       5     [4,23]
 *       7     [4,23]
 *       8     [4,23]
 *       2     [2,23]
 *       46    [2,46]
 * 
 *
 */

////////////////////////////////////////////////////////////////////////////////////////////////


// 4단계

/**
 * 1.횟수 제한 -- 가능
 * //게임 시작할 지 말 지 선택하는건 1 번만 되게
 *
 * 
 * 
 * //화요일
 * 승패 결과 숫자를 담는 변수도 만들어야 한다. [승, 패 , 비김]
 * playComputer가 끝났을 때, 시도 횟수를 리턴한다.
 * playComputer{
 * 컴퓨터의 플레이데이터 생성
 * 유저 결과랑 비교하고 승/패 결정
 * 이 결과를 리턴
 * }
 * 
 * 
 * 
 * 2.컴퓨터도 게임 같이 플레이  (컴퓨터의 2, 3 단계 만들기)
 * 
 * 유저 데이터: 시도 횟수, 최소/최대 시도횟수, 유저 응답 , 승리/패배/비김 횟수
 * 컴퓨터 데이터: 컴퓨터의 응답,  시도 횟수, 최소/최대 시도 횟수 
 *
 * 
 * 3.승리/ 패배 횟수 비교하기
 *    - 승리/ 패배 게임 1 개마다 알려주고
 *    - 결과를 누적해서 비교할 수 있게 보여주기
 */




const readline = require('readline')
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let attemptCount = [];
let answer = [];
let attempt = 0;
let attemptLimit = 10;



function init(answer, attempt, attemptLimit){
   if(attemptCount.length === 0){
      userInput.question("게임을 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
         if(choice === "1"){
            answer = makeAnswer();
            console.log(`컴퓨터가 숫자를 뽑았습니다. 디버깅용: ${answer}`);
            
            play(answer, attempt, attemptLimit);
         } else if(choice === "9"){
            console.log("어플리케이션이 종료되었습니다.");
            userInput.close();
         } else{
            console.log("1 또는 9를 입력하세요.");
         }
      })
   }else{
      userInput.question("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
         if(choice === "1"){
            attempt = 0;
            answer = makeAnswer();
            console.log(`컴퓨터가 숫자를 뽑았습니다. 디버깅용: ${answer}`);
            play(answer, attempt, attemptLimit);
      
         } else if(choice === "9"){
            console.log("어플리케이션이 종료되었습니다.");
            if(attemptCount.length === 2){
               console.log(`가장 적은 시도 횟수: ${attemptCount[0]}, 가장 많은 시도 횟수: ${attemptCount[1]}`);
            }else{
               console.log(`시도 횟수: ${attemptCount[0]}`);
            }
            userInput.close();
         } else{
            console.log("1 또는 9를 입력하세요.");
            
         }
      });
   }
}


// function start(){
//    userInput.question("게임을 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
//    if(choice === "1"){
//       const answer = makeAnswer();
//       console.log(`컴퓨터가 숫자를 뽑았습니다. 디버깅용: ${answer}`);
      
//       let attempt = 0;
//       play(answer, attempt);
//    } else if(choice === "9"){
//       console.log("어플리케이션이 종료되었습니다.");
//       userInput.close();
//    } else{
//       console.log("1 또는 9를 입력하세요.");
//    }
// })
// };



// function restart(){
//    userInput.question("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
//    if(choice === "1"){
//       start();

//    } else if(choice === "9"){
//       console.log("어플리케이션이 종료되었습니다.");
//       if(attemptCount.length === 2){
//          console.log(`가장 적은 시도 횟수: ${attemptCount[0]}, 가장 많은 시도 횟수: ${attemptCount[1]}`);
//       }else{
//          console.log(`시도 횟수: ${attemptCount[0]}`);
//       }
//       userInput.close();
//    } else{
//       console.log("1 또는 9를 입력하세요.");
//       process.exit();
//    }
// });
// }

function makeAnswer(){
      let numbers = new Set();
      while(numbers.size < 3){
         numbers.add(Math.floor(Math.random()*10))
      }
      return [...numbers];
   }
   


function play(answer, attempt, attemptLimit){
   attempt += 1;
   if(attempt > attemptLimit){
      // 게임이 끝나는 부분
      console.log(`시도횟수: ${attempt} - 최대 시도 횟수 10회를 초과했습니다`);
      updateAttempt(attempt);
      // restart();// 버그 가능성 높음: 전달 값이 없음. 
      return;
   }

// 컴퓨터의 값이 생성된다. 

// 유저의 값이 생성된다. 


   userInput.question('숫자를 입력하세요: ', (input) => {
   input = [...input].map(Number);
   console.log(input);

   if(input.length !== 3){ // 엔터만 치면 처리할 수 없어요. 알아봐야 해요. 
      console.log(`시도횟수: ${attempt} / 숫자를 3개만 입력해주세요.`)
      play(answer, attempt, attemptLimit);
      return;
   }

   // let resultCount = new Map();
   // resultCount.set("Strike",0);
   // resultCount.set("Ball",0);

   // input = input.map((value, index)=>{
   //       if(answer[index] === value){ 
   //          resultCount.set("Strike",resultCount.get("Strike")+1);
   //       }else if(answer.includes(input[index])){
   //          resultCount.set("Ball",resultCount.get("Ball")+1);
   //       }
   //    }  
   // )

   input = resultValidation(input);
   console.log(input);

   if(resultCount.get('Strike') !== 3){
      console.log(`시도횟수: ${attempt} / ${resultCount.get("Strike")} 스트라이크 ${resultCount.get("Ball")} 볼`)
      play(answer, attempt, attemptLimit);
   }else{
      // 게임이 끝나는 부분 
      console.log(`시도횟수: ${attempt} / 3개의 숫자를 모두 맞히셨습니다.\n--------게임종료--------`)
      updateAttempt(attempt);

      let computerAttempt = playComputer(answer, attemptLimit).attempt;
      
      if(attempt > computerAttempt){
         console.log('유저가 승리했습니다.')
      }else if(attempt === computerAttempt) {
         console.log('무승부입니다 .')
      }else{
         console.log('컴퓨터가 승리했습니다.')
      }

      init(answer, attempt, attemptLimit);
   }
})
}

function resultValidation(answer, input){
   let resultCount = new Map();
   resultCount.set("Strike",0);
   resultCount.set("Ball",0);

   return input.map((value, index)=>{
      if(answer[index] === value){ 
         resultCount.set("Strike",resultCount.get("Strike")+1);
      }else if(answer.includes(input[index])){
         resultCount.set("Ball",resultCount.get("Ball")+1);
      }
   })
}

function playComputer(answer, attemptLimit){
   //컴퓨터 응답
   let attempt = 1
   let computerNumber = new Set();
   while(computerNumber.size < 3){
      computerNumber.add(Math.floor(Math.random()*10))
   }
   computerNumber = [...computerNumber];

   function computerPlayData(answer, computerNumber,attempt, attemptLimit){
      computerNumber = resultValidation(answer, computerNumber);
      
      if(attempt > attemptLimit){
         console.log("시도횟수를 초과했습니다.")
         return {'attempt' : attempt};
      }

      if(resultCount.get('Strike') !== 3){
         attempt +=1;
         computerNumber = new Set();
         while(computerNumber.size < 3){
            computerNumber.add(Math.floor(Math.random()*10))
         }
         computerNumber = [...computerNumber];
         computerPlayData(answer, computerNumber, attempt, attemptLimit);
      }else{
      // 게임이 끝나는 부분
         console.log('컴퓨터가 정답을 맞혔습니다.')
         return {'attempt' : attempt};
   }
   }
   //게임 한 판 당 컴퓨터 시도횟수
   //컴퓨터 최소 최대 시도횟수
   // 시도 횟수 제한 10번
}

function updateAttempt(attempt){
   if(attemptCount.length === 0){
      attemptCount = [attempt,attempt];
   }else{
      attemptCount[0] = Math.min(attemptCount[0],attempt);
      attemptCount[1] = Math.max(attemptCount[1],attempt);
   }
};


init(answer, attempt, attemptLimit);