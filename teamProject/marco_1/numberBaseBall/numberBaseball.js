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
 * 
 * 
 * 3.승리/ 패배 횟수 비교하기
 *    - 승리/ 패배 게임 1 개마다 알려주고
 * 
 * -----------------------------------------------------------------------------------------------------------
 * 
 *    - 결과를 누적해서 비교할 수 있게 보여주기
 * 2025/02/18-----------------------------------------------------------------------------------------------------
 */


// let attemptCount = [];
// let answer = [];
// let attempt = 0;
// let attemptLimit = 10;

// 진입점 분기 필요! 
// 게임 실행 여부 

// function init(answer, attempt, attemptLimit){
//    if(attemptCount.length === 0){
//       userInput.question("게임을 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
//          if(choice === "1"){
//             answer = makeAnswer();
//             console.log(`컴퓨터가 숫자를 뽑았습니다. 디버깅용: ${answer}`);
            
//             play(answer, attempt, attemptLimit);
//          } else if(choice === "9"){
//             console.log("어플리케이션이 종료되었습니다.");
//             userInput.close();
//          } else{
//             console.log("1 또는 9를 입력하세요.");
//          }
//       })
//    }else{
//       userInput.question("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요",(choice)=> {
//          if(choice === "1"){
//             attempt = 0;
//             answer = makeAnswer();
//             console.log(`컴퓨터가 숫자를 뽑았습니다. 디버깅용: ${answer}`);
//             play(answer, attempt, attemptLimit);
      
//          } else if(choice === "9"){
//             console.log("어플리케이션이 종료되었습니다.");
//             if(attemptCount.length === 2){
//                console.log(`가장 적은 시도 횟수: ${attemptCount[0]}, 가장 많은 시도 횟수: ${attemptCount[1]}`);
//             }else{
//                console.log(`시도 횟수: ${attemptCount[0]}`);
//             }
//             userInput.close();
//          } else{
//             console.log("1 또는 9를 입력하세요.");
            
//          }
//       });
//    }
// }


const readline = require('readline')
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// let attemptCount = [];
let gameRecords = [];
let userStats = { wins: 0, losses: 0 }; 
let gameId = 1;


function init(isRestart = false){
   if(isRestart){
      console.log("\n 게임이 종료되었습니다.");
   }
   if(gameRecords.length > 0 && isRestart){
      console.log(" 현재까지의 게임 기록이 있습니다.");
   }
   // 여기서 부터 합시다. 
   userInput.question("게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9를 입력하세요:",(choice)=> {
      if(choice === "1"){
        startGame();
      } else if(choice === "2"){
         displayGameRecords();
      } else if(choice === "3"){
         displayGameStats();
      } else if(choice === "9"){
          console.log("어플리케이션이 종료되었습니다.");
          userInput.close();
      } else{
          console.log("1,2,3,9 중에 하나를 입력하세요.");
          init(false);
      }   
   });
}

function startGame(){
   userInput.question('최대 시도 횟수를 몇 번으로 정하시겠습니까?', (attemptLimit)=>{
      attemptLimit = parseInt(attemptLimit);
      if (isNaN(attemptLimit) || attemptLimit < 1) {
         console.log(" 1 이상의 숫자를 입력하세요.");
         startGame();
         return;
      }
      const answer = makeAnswer();
      // console.log(`정답이 생성되었습니다. (디버깅용: ${answer})`);
      console.log(`정답이 생성되었습니다.`);
      play(answer, 0, attemptLimit, []); // 히스토리 배열은 파일로 남겨보자. 파일관리도 해보자.
   })
}

// function exitGame(){

// }
// 정답 생성 

function makeAnswer(){
      let numbers = new Set();
      while(numbers.size < 3){
         numbers.add(Math.floor(Math.random()*10))
      }
      return [...numbers];
}

//게임 진행 
// function play(answer, attempt, attemptLimit, histor){
//    attempt += 1;
//    if(attempt > attemptLimit){
//       // 게임이 끝나는 부분
//       console.log(`시도횟수: ${attempt} - 최대 시도 횟수 10회를 초과했습니다`);
//       updateMinMax(attempt);
//       // restart();// 버그 가능성 높음: 전달 값이 없음. 
//       return;
//    }

//    userInput.question('숫자를 입력하세요: ', (input) => {
//    input = [...input].map(Number);
//    console.log(input);

//    if(input.length !== 3){ // 엔터만 치면 처리할 수 없어요. 알아봐야 해요. 
//       console.log(`시도횟수: ${attempt} / 숫자를 3개만 입력해주세요.`)
//       play(answer, attempt, attemptLimit);
//       return;
//    }

//    let hint = new Map();
//    input = resultValidation(answer, input, hint);
//    console.log(hint);
   
//    if(hint.get('Strike') !== 3){
//       console.log(`시도횟수: ${attempt} / ${hint.get("Strike")} 스트라이크 ${hint.get("Ball")} 볼`)
//       play(answer, attempt, attemptLimit);
//    }else{
//       // 게임이 끝나는 부분 
//       console.log(`시도횟수: ${attempt} / 3개의 숫자를 모두 맞히셨습니다.\n--------게임종료--------`)
//       updateMinMax(attempt);

//       let computerAttempt = playComputer(answer, attemptLimit);
//       console.log(`conputer attemp prompt: ${computerAttempt}`);

//       // 승패 결정 함수 분리
//       if(attempt < computerAttempt){
//          console.log('유저가 승리했습니다.')
//       }else if(attempt === computerAttempt) {
//          console.log('무승부입니다 .')
//       }else{
//          console.log('컴퓨터가 승리했습니다.')
//       }

//       init(answer, attempt, attemptLimit);
//    }
// })
// }

function play(answer, attempt, attemptLimit, history){
   let winner = '';
   let start = new Date().toLocaleString();
   attempt ++;
   if(attempt === attemptLimit){
      // 게임이 끝나는 부분
      console.log(`시도횟수: ${attempt} - 최대 시도 횟수 ${attemptLimit}를 초과했습니다`);
      // 컴퓨터도 게임을 플레이 해야함 - 컴퓨터가 게임하는 알고리즘;
      let computerAttempt = playComputer(answer, attemptLimit);
      

      winner = winLose(attempt, computerAttempt, winner);

      //게임 결과 저장하는 부분
      saveGameRecord(start, attempt, history, winner);

      // 게임 설정 창으로 이동
      init(true);
      return;
   }

   userInput.question('숫자를 입력하세요: ', (input) => {
   input = [...input].map(Number);
   console.log(input);

   if(input.length !== 3){ // 엔터만 치면 처리할 수 없어요. 알아봐야 해요. 
      console.log(`시도횟수: ${attempt} / 숫자를 3개만 입력해주세요.`)
      play(answer, attempt, attemptLimit, history);
      return;
   }

   
   //resultValidation 반환값 확인해봐야함
   let hint = resultValidation(answer, input);
   // console.log(hint); 
   
   if(hint.get('Strike') !== 3){
      console.log(formatResult(hint));
      history.push({ input: input.join(""), result: formatResult(hint) });
      play(answer, attempt, attemptLimit, history);
   }else{
      // 게임이 끝나는 부분 
      console.log(`시도횟수: ${attempt} / 3개의 숫자를 모두 맞히셨습니다.\n--------게임종료--------`)

      let computerAttempt = playComputer(answer, attemptLimit);
      // console.log(`conputer attemp prompt: ${computerAttempt}`);

      // 승패 결정 함수 분리
      winner = winLose(attempt, computerAttempt, winner);
      //게임 결과 저장하는 부분
      saveGameRecord(start, attempt, history, winner);

      init(true);
   }
})
}


function winLose(attempt, computerAttempt, winner){
   if(attempt < computerAttempt){
         winner = "user"
         userStats.wins++;
      }else if(attempt == computerAttempt){
         winner = ""
      }else{
         winner = "computer"
         userStats.losses++;
      }
      return winner;
}

function playComputer(answer, attemptLimit){
   //컴퓨터 응답
   let attempt = 0
   let computerNumber = new Set();
   while(computerNumber.size < 3){
      computerNumber.add(Math.floor(Math.random()*10))
   }
   computerNumber = [...computerNumber];

   attempt = computerPlayData(answer, computerNumber, attempt, attemptLimit);

   return attempt;
   //게임 한 판 당 컴퓨터 시도횟수
   //컴퓨터 최소 최대 시도횟수
   // 시도 횟수 제한 10번
}

function computerPlayData(answer, computerNumber,attempt, attemptLimit){
      let hint = new Map();
      computerNumber = resultValidation(answer, computerNumber, hint);
      attempt += 1;
      if(hint.get('Strike') !== 3){
         if(attempt > attemptLimit){
            return attempt;
         }else{
            computerNumber = new Set();
            while(computerNumber.size < 3){
               computerNumber.add(Math.floor(Math.random()*10))
            }
            computerNumber = [...computerNumber];
           return computerPlayData(answer, computerNumber, attempt, attemptLimit);
         }
      }else{
      // 게임이 끝나는 부분
         console.log('컴퓨터가 정답을 맞혔습니다.');
         console.log(attempt);
         return  attempt;
      }
      
}

//값 확인
function resultValidation(answer, input){
   let hint = new Map();
   hint.set("Strike",0);
   hint.set("Ball",0);

   input.forEach((value, index)=>{
      if(answer[index] === value){ 
         hint.set("Strike",hint.get("Strike")+1);
      }else if(answer.includes(input[index])){
         hint.set("Ball",hint.get("Ball")+1);
      }
   })

   return hint;
}

function formatResult(hint) {
   let strike = hint.get("Strike");
   let ball = hint.get("Ball");

   if(strike == 0 && ball != 0){
      return `${ball} 볼`;
   }else if(strike != 0 && ball == 0){
      return `${strike} 스트라이크`;
   }else if(strike != 0 && ball != 0){
      return `${strike} 스트라이크 ${ball} 볼`;
   }else{
      return `낫싱`;
   }
}

// 게임 결과 기장
// 양극값 저장
function updateMinMax(attempt){
   if(attemptCount.length === 0){
      attemptCount = [attempt,attempt];
   }else{
      attemptCount[0] = Math.min(attemptCount[0],attempt);
      attemptCount[1] = Math.max(attemptCount[1],attempt);
   }
};

//게임 1판의 결과 저장
function saveGameRecord(start, attempt, history, winner) {
   const end = new Date().toLocaleString();
   gameRecords.push({ id: gameId++, startTime: start, endTime: end, tryCount: attempt, inputHistory: history, winnerName: winner});
}

// 게임 결과 조회 
function displayGameRecords(){
   if (gameRecords.length === 0) {
        console.log(" 저장된 게임 기록이 없습니다.");
        init();
        return;
    }
    console.log("\n 게임 기록");
    gameRecords.forEach(record => {
        console.log(`[${record.id}] / 시작시간: ${record.startTime} / 시작시간: ${record.endTime} / 횟수: ${record.tryCount} / 승리자: ${record.winnerName}`);
    });
    userInput.question("확인할 게임 번호를 입력하세요 (종료하려면 0 입력): ", (gameNumber) => {
        gameNumber = parseInt(gameNumber);
        if (gameNumber === 0) {
            init();
        } else {
            const record = gameRecords.find(r => r.id === gameNumber);
            if (record) {
                console.log(`\n ${record.id}번 게임 결과`);
                console.log(record.inputHistory);
                record.inputHistory.forEach((entry, index) => {
                    console.log(`(${index + 1}) ${entry.input} -> ${entry.result}`);
                });
                console.log("-------기록 종료-------");
            } else {
                console.log("존재하지 않는 게임 번호입니다.");
            }
            displayGameRecords();
        }
    });

   
}

function displayGameStats() {
    if (gameRecords.length === 0) {
        console.log("저장된 게임 기록이 없습니다.");
        init(false);
        return;
    }

    const minAttempt = Math.min(...gameRecords.map(g => g.tryCount));
    const maxAttempt = Math.max(...gameRecords.map(g => g.tryCount));
    const avgAttempt = (gameRecords.reduce((sum, g) => sum + g.tryCount, 0) / gameRecords.length).toFixed(1);

    // 유저 승리/패배 횟수별 시도 횟수 배열 추출
    let modeAttemptWin = gameRecords.filter(g => g.winnerName === 'user').map(g => g.tryCount);
    let modeAttemptLose = gameRecords.filter(g => g.winnerName === 'computer').map(g => g.tryCount);

    console.log("유저 승리 시도 횟수 배열:", modeAttemptWin);
    console.log("유저 패배 시도 횟수 배열:", modeAttemptLose);

    // 최빈값 계산
      if (modeAttemptWin.length > 0) {
         modeAttemptWin = findModes(modeAttemptWin).join(',')
      }else {
         modeAttemptWin= "-"
      };

      if (modeAttemptLose.length > 0) {
         modeAttemptLose = findModes(modeAttemptLose).join(',')
      }else {
         modeAttemptLose= "-"
      };
    
    console.log("\n 게임 통계");
    console.log(`가장 적은 횟수: ${minAttempt}회`);
    console.log(`가장 많은 횟수: ${maxAttempt}회`);
    console.log(`평균 횟수: ${avgAttempt}회`);
    console.log(`유저의 승리 최빈값: ${modeAttemptWin}회`);
    console.log(`유저의 패배 최빈값: ${modeAttemptLose}회`);
    console.log(`사용자 전적: ${userStats.wins}승 / ${userStats.losses}패 / 승률: ${Math.floor((userStats.wins / (userStats.wins + userStats.losses)) * 100)}%`);
    console.log(`컴퓨터 전적: ${userStats.losses}승 / ${userStats.wins}패 / 승률: ${Math.floor((userStats.losses / (userStats.wins + userStats.losses)) * 100)}%`)
    console.log("--------통계 종료--------");

    init(false);
}

// 최빈값 계산 함수
function findModes(arr) {
    let frequency = new Map();
    let maxFreq = 0;

    arr.forEach(num => {
        frequency.set(num, (frequency.get(num) || 0) + 1);
        maxFreq = Math.max(maxFreq, frequency.get(num));
    });

    return [...frequency.entries()]
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => num);
}

//게임 시작
// init(answer, attempt, attemptLimit);
init();