const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('이름을 입력하세요: ', (answer) => {
  console.log(`안녕하세요, ${answer}님!`);
  rl.close();
});
