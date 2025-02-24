const express = require('express');
const router = express.Router();
const conn = require('../mariadb'); // DB 연결 모듈 가져오기

router.use(express.json());

/** 유저 API */

// 로그인 (POST /login)
router.post('/login', (req, res) => {
   try {
      let { userId, password } = req.body;

      conn.query(
         'SELECT * FROM users WHERE user_id = ?', [userId],
         (err, results) => {
            if (err) {
               console.error("DB 조회 오류:", err);
               return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }

            if (results.length === 0) {
               return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
            }

            const user = results[0];

            if (user.password !== password) {
               return res.status(401).json({ status: 'error', message: '비밀번호가 일치하지 않습니다.' });
            }

            res.json({ status: 'success', message: `${user.name}님 환영합니다!` });
         }
      );
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});


// 회원 가입 (POST /join)
router.post('/join', (req, res) => {

   


   
   try {
      console.log("요청 데이터:", req.body);
      let { userId, name, password, email, role } = req.body;
      if (/^\d+$/.test(userId)) {
         return res.status(400).json({ status: 'error', message: '유효한 형식의 ID를 요청해야 합니다.' });
      };

      conn.query(
         'SELECT * FROM users WHERE user_id = ?', [email],
         (err, results) => {
            if (err) {
               console.error("DB 조회 오류:", err);
               return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }

            if (results.length > 0) {
               return res.status(400).json({ status: 'error', message: '이미 존재하는 ID입니다.' });
            }

            conn.query(
               'INSERT INTO users (user_id, name, password, email, role, created_at, updated_at, is_activated) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 1)',
               [userId, name, password, email, role],
               (err, result) => {
                  if (err) {
                     console.error("회원가입 DB 삽입 오류:", err);
                     return res.status(500).json({ status: 'error', message: '회원가입 실패' });
                  }

                  console.log(`${name}님 가입 완료!`);
                  res.status(201).json({ status: 'success', message: `${name}님 가입을 환영합니다!` });
               }
            );
         }
      );
   } catch (error) {
      console.error("서버 오류 발생:", error);
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }

});

// 회원 정보 조회 (GET /users/:id)
router
.get('/users/:userId', (req, res) => {
   try {
      let { userId } = req.params;
      console.log(userId);

      conn.query(
         'SELECT user_id, name, email, role, created_at, updated_at, last_login, is_activated FROM users WHERE user_id = ?',
         [userId],
         (err, results) => {
            if (err) {
               console.error("DB 조회 오류:", err);
               return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }

            if (results.length === 0) {
               return res.status(404).json({ status: 'error', message: '회원 정보를 찾을 수 없습니다.' });
            }

            res.json({ status: 'success', data: results[0] });
         }
      );
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
})
.delete('/users/:userId', (req, res) => {
   try {
      let { userId } = req.params;

      conn.query(
         'DELETE FROM users WHERE user_id = ?',
         [userId],
         (err, result) => {
            if (err) {
               console.error("회원 삭제 오류:", err);
               return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }

            if (result.affectedRows === 0) {
               return res.status(404).json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' });
            }

            res.json({ status: 'success', message: `${userId}님 탈퇴 완료.` });
         }
      );
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
});


module.exports = router;
