const express = require('express');
const router = express.Router();
const { getUserById, deleteUser } = require('../controllers/userController');
const { param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');

// 회원 정보 조회 및 삭제
router.route('/:id')
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getUserById
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteUser
    );

module.exports = router;
