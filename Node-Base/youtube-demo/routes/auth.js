const express = require('express');
const router = express.Router();
const conn = require('../mariadb'); 
const {param, validationResult} = require('express-validator');
router.use(express.json());

// 로그인 (POST /login)
router
   .route('/login')
   .post( (req, res) => {
      try {
         let { id, password } = req.body;

         conn.query(
            'SELECT * FROM users WHERE id = ?', [id],
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
router
   .route('/join')
   .post((req, res) => {
      try {

         let { id, name, password, email, role } = req.body;
         if (/^\d+$/.test(id)) {
            return res.status(400).json({ status: 'error', message: '유효한 형식의 ID를 요청해야 합니다.' });
         };

         conn.query(
            'SELECT * FROM users WHERE id = ?', [email],
            (err, results) => {
               if (err) {
                  console.error("DB 조회 오류:", err);
                  return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
               }

               if (results.length > 0) {
                  return res.status(400).json({ status: 'error', message: '이미 존재하는 ID입니다.' });
               }

               conn.query(
                  'INSERT INTO users (id, name, password, email, role, created_at, updated_at, is_activated) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 1)',
                  [id, name, password, email, role],
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
   }
);


module.exports = router;