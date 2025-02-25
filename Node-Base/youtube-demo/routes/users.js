const express = require('express');
const router = express.Router();
const conn = require('../mariadb'); 
const { param, validationResult } = require('express-validator');

router.use(express.json());

/** 유저 API */

// 회원 정보 조회 및 삭제 (GET, DELETE /users/:id)
router
    .route('/:id')
    .get(
        param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'),

        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', errors: errors.array() });
            }

            try {
                let { id } = req.params;

                conn.query(
                    'SELECT id, name, email, role, created_at, updated_at, last_login, is_activated FROM users WHERE id = ?',
                    [id],
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
        }
    )
    .delete(
        param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'),

        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', errors: errors.array() });
            }

            try {
                let { id } = req.params;

                conn.query(
                    'DELETE FROM users WHERE id = ?',
                    [id],
                    (err, result) => {
                        if (err) {
                            console.error("회원 삭제 오류:", err);
                            return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
                        }

                        if (result.affectedRows === 0) {
                            return res.status(404).json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' });
                        }

                        res.json({ status: 'success', message: `${id}님 탈퇴 완료.` });
                    }
                );
            } catch (error) {
                res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }
        }
    );

// 특정 유저의 전체 채널 조회 (GET /users/:userId/channels)
router
    .route('/channels/:userId')
    .get(
        param('userId').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'),

        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'error', errors: errors.array() });
            }

            console.log(req.params);
            const { userId } = req.params;

            try {
                conn.query(
                    'SELECT * FROM (SELECT id, name FROM users WHERE id = ?) a JOIN channels ON a.id = channels.user_id',
                    [userId],
                    (err, results) => {
                        if (err) {
                            console.error("DB 조회 오류:", err);
                            return res.status(500).json({ status: 'error', message: '서버 오류 발생' });
                        }

                        if (results.length === 0) {
                            return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
                        }

                        let name = results[0].name;
                        res.json({ status: 'success', message: `${name}님의 전체 채널 목록입니다!`, data: results });
                    }
                );
            } catch (error) {
                res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }
        }
    );

module.exports = router;
