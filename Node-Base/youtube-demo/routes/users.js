const express = require('express');
const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join('/usr/src/youtube-demo/', 'users.json'); 
const router = express.Router();

router.use(express.json());




/** 유저 API*/

// 메모리 대신 파일 사용하기 => 나중 실습에서 확장하기 편했으면 좋겠다. 
// 나중에 마이페이지 회원 정보 수정도 추가해라
const loadUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            console.log("users.json 파일이 없어서 새로 생성합니다.");
            fs.writeFileSync(USERS_FILE, JSON.stringify([])); 
        }

        const fileData = fs.readFileSync(USERS_FILE, 'utf-8');

        if (!fileData.trim()) { 
            console.log("users.json 파일이 비어 있어 초기화합니다.");
            fs.writeFileSync(USERS_FILE, JSON.stringify([]));
            return [];
        }

        const users = JSON.parse(fileData);

        if (!Array.isArray(users)) { 
            console.error("유저 데이터가 배열이 아님. 파일을 초기화합니다.");
            fs.writeFileSync(USERS_FILE, JSON.stringify([]));
            return [];
        }

        return users;
    } catch (error) {
        console.error("users.json을 불러오는 중 오류 발생:", error);
        return [];
    }
};



const saveUsers = (users) => {
    if (!Array.isArray(users)) {
        console.error("저장할 데이터가 배열이 아닙니다. 저장하지 않습니다.");
        return;
    }
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("users.json 저장 중 오류 발생:", error);
    }
};





// 로그인 (POST /login)
router.post('/login', (req, res) => {
   try {
      let { userId, password } = req.body;

      const users = loadUsers();
      
      const user = users.find(user => user.userId === userId);
      
      if (!user) {
         return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
      }

      if (user.password !== password) {
         return res.status(401).json({ status: 'error', message: '비밀번호가 일치하지 않습니다.' });
      }

      res.json({ status: 'success', message: `${user.name}님 환영합니다!` });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});

// 회원 가입 (POST /join)
router.post('/join', (req, res) => {
   try {
      console.log("요청 데이터:", req.body);

      let { userId, name, password } = req.body;


      let users = []; 

      try {
         users = loadUsers();
         if (!Array.isArray(users)) {
            throw new Error("유저 데이터가 배열이 아닙니다!");
         }
      } catch (error) {
         console.error("유저 데이터를 불러오는 중 오류 발생:", error);
         return res.status(500).json({ status: 'error', message: '서버 데이터 로드 실패' });
      }

      console.log("로드된 유저 데이터:", users);

      if (users.some(user => user.userId === userId)) {
         return res.status(400).json({ status: 'error', message: '이미 존재하는 ID입니다.' });
      }

      const newUser = { userId, name, password };
      users.push(newUser);
      try {
         saveUsers(users);
      } catch (error) {
         console.error("유저 데이터를 저장하는 중 오류 발생:", error);
         return res.status(500).json({ status: 'error', message: '유저 데이터 저장 실패' });
      }

      console.log(`${newUser.name}님 가입 완료!`);

      res.status(201).json({ status: 'success', message: `${newUser.name}님 가입을 환영합니다!` });
   } catch (error) {
      console.error("서버 오류 발생:", error);
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});



// 회원 정보 조회 (GET /users/:id)
// 회원 탈퇴 (DELETE /users/:id)

router
   .route('/users/:userId')
   .get( (req, res) => {
      try {
         let { userId } = req.params;
         console.log(req.params);
         console.log(userId);
         const users = loadUsers();
         console.log(users);
         const user = users.find(user => user.userId === userId);

         if (!user) {
            return res.status(404).json({ status: 'error', message: '회원 정보를 찾을 수 없습니다.' });
         }

         res.json({ status: 'success', data: user });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .delete((req, res) => {
      try {
         let { userId } = req.params;

         let users = loadUsers();
         console.log(users);
         console.log(req.params);
         console.log(userId);
         const index = users.findIndex(user => user.userId === userId);

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


module.exports = router;