const readline = require('readline');

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let attemptCount = []; // 최소/최대 시도 횟수 저장
let gameStats = { wins: 0, losses: 0, draws: 0 }; // 승/패/무승부 저장

const ATTEMPT_LIMIT = 10; // 최대 시도 횟수 제한

function initGame(isRestart = false) {
    if (isRestart) {
        console.log("\n🔄 게임이 종료되었습니다.");
    }

    if (attemptCount.length > 0) {
        console.log(`📊 현재까지의 기록: 최소 시도 횟수: ${attemptCount[0]}, 최대 시도 횟수: ${attemptCount[1]}`);
        console.log(`⚔️ 승리: ${gameStats.wins}, 패배: ${gameStats.losses}, 무승부: ${gameStats.draws}`);
    }

    userInput.question("🎮 게임을 시작하려면 1, 종료하려면 9를 입력하세요: ", (choice) => {
        if (choice === "1") {
            const answer = generateAnswer();
            console.log(`🤖 컴퓨터가 숫자를 선택했습니다! (디버깅용: ${answer})`);
            play(answer, 0, "user");
        } else if (choice === "9") {
            exitGame();
        } else {
            console.log("❗ 1 또는 9를 입력하세요.");
            initGame(isRestart);
        }
    });
}

function generateAnswer() {
    let numbers = new Set();
    while (numbers.size < 3) {
        numbers.add(Math.floor(Math.random() * 10));
    }
    return [...numbers];
}

function play(answer, attempt, player) {
    attempt++;

    if (attempt > ATTEMPT_LIMIT) {
        console.log(`⚠️ 시도횟수: ${attempt} - 최대 시도 횟수(10회)를 초과했습니다.`);
        updateAttempt(attempt);
        initGame(true);
        return;
    }

    if (player === "user") {
        userInput.question('🔢 숫자를 입력하세요 (예: 123): ', (input) => {
            if (!validateInput(input)) {
                console.log(`🚫 시도횟수: ${attempt} / 숫자를 정확히 3개 입력해주세요.`);
                play(answer, attempt, "user");
                return;
            }

            const userNumbers = [...input].map(Number);
            const result = checkResult(answer, userNumbers);

            if (result.strike === 3) {
                console.log(`🎉 시도횟수: ${attempt} / 3개의 숫자를 모두 맞히셨습니다!`);
                updateAttempt(attempt);
                let computerAttempt = playComputer(answer);
                determineWinner(attempt, computerAttempt);
                initGame(true);
            } else {
                console.log(`⚾ 시도횟수: ${attempt} / ${result.strike} 스트라이크 ${result.ball} 볼`);
                play(answer, attempt, "user");
            }
        });
    }
}

function validateInput(input) {
    return /^\d{3}$/.test(input);
}

function checkResult(answer, inputNumbers) {
    let strike = 0, ball = 0;

    inputNumbers.forEach((num, index) => {
        if (answer[index] === num) {
            strike++;
        } else if (answer.includes(num)) {
            ball++;
        }
    });

    return { strike, ball };
}

function playComputer(answer) {
    let attempt = 0;
    let computerGuess = [];

    while (true) {
        attempt++;
        computerGuess = generateAnswer();
        const result = checkResult(answer, computerGuess);

        if (result.strike === 3 || attempt > ATTEMPT_LIMIT) break;
    }

    console.log(`🤖 컴퓨터가 ${attempt}번 만에 정답을 맞혔습니다!`);
    return attempt;
}

function determineWinner(userAttempt, computerAttempt) {
    if (userAttempt < computerAttempt) {
        console.log("🏆 유저가 승리했습니다!");
        gameStats.wins++;
    } else if (userAttempt > computerAttempt) {
        console.log("🤖 컴퓨터가 승리했습니다!");
        gameStats.losses++;
    } else {
        console.log("⚖️ 무승부입니다!");
        gameStats.draws++;
    }
}

function exitGame() {
    console.log("\n🛑 어플리케이션이 종료되었습니다.");
    if (attemptCount.length > 0) {
        console.log(`📊 최종 기록: 최소 시도 횟수: ${attemptCount[0]}, 최대 시도 횟수: ${attemptCount[1]}`);
    }
    console.log(`⚔️ 최종 승패 기록: 승리 ${gameStats.wins} / 패배 ${gameStats.losses} / 무승부 ${gameStats.draws}`);
    userInput.close();
}

function updateAttempt(attempt) {
    if (attemptCount.length === 0) {
        attemptCount = [attempt, attempt];
    } else {
        attemptCount[0] = Math.min(attemptCount[0], attempt);
        attemptCount[1] = Math.max(attemptCount[1], attempt);
    }
}

initGame();
