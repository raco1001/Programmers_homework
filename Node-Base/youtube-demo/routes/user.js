const express = require('express');
const router = express.Router();
const { getUserById, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// JWT 인증 후 유저 개별 조회
router.route('/me')
    .get(authenticateToken, getUserById) // JWT 인증 후 컨트롤러 실행
    .delete(authenticateToken, deleteUser); // JWT 인증 후 컨트롤러 실행

module.exports = router;
