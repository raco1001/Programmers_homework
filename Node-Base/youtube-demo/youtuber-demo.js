const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join('/usr/src/youtube-demo/', 'users.json'); 
app.use(express.json());
app.listen(PORT, () => console.log(`http://localhost:3007`));


// 메모리 대신 파일 사용하기 => 나중 실습에서 확장하기 편했으면 좋겠다. 
// 나중에 마이페이지 회원 정보 수정도 추가해라
const loadUsers = () => {
   if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
   }
   return JSON.parse(fs.readFileSync(USERS_FILE));
};


const saveUsers = (users) => {
   fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};



// 로그인 (POST /login)
app.post('/login', (req, res) => {
   try {
      const { id, pwd } = req.body;
      const users = loadUsers();
      const user = users.find(user => user.id === id);

      if (!user) {
         return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
      }

      if (user.pwd !== pwd) {
         return res.status(401).json({ status: 'error', message: '비밀번호가 일치하지 않습니다.' });
      }

      res.json({ status: 'success', message: `${user.id}님 환영합니다!` });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
    }
});

// 회원 가입 (POST /join)
app.post('/join', (req, res) => {
   try {
      console.log("요청 데이터:", req.body);
      let { id, pwd } = req.body;
      id = parseInt(id);
      console.log("숫자 id:", id);
      let users = loadUsers();
      console.log("조회 정보", users);
      if (users.some(user => user.id === id)) {
         return res.status(400).json({ status: 'error', message: '이미 존재하는 ID입니다.' });
      }

      const newUser = { id, pwd };
      users.push(newUser);
      saveUsers(users);

      res.status(201).json({ status: 'success', message: `${id}님 가입을 환영합니다!` });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});

// 회원 정보 조회 (GET /users/:id)
app.get('/users/:id', (req, res) => {
   try {
      const { id } = req.params;
      const users = loadUsers();
      const user = users.find(user => user.id === id);

      if (!user) {
         return res.status(404).json({ status: 'error', message: '회원 정보를 찾을 수 없습니다.' });
      }

      res.json({ status: 'success', data: user });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});

// 회원 탈퇴 (DELETE /users/:id)
app.delete('/users/:id', (req, res) => {
   try {
      const { id } = req.params;
      let users = loadUsers();
      const index = users.findIndex(user => user.id === id);

      if (index === -1) {
         return res.status(404).json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' });
      }

      const deletedUser = users.splice(index, 1);
      saveUsers(users);

      res.json({ status: 'success', message: `${deletedUser[0].id}님 탈퇴 완료.` });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
    }
});

