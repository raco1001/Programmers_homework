const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { login, register } = require('../controllers/authController');

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('유효한 이메일을 입력하세요.'),
        body('password').isString().notEmpty().withMessage('비밀번호를 입력하세요.'),
        validateRequest
    ],
    login
);

router.post(
    '/join',
    [
        body('email').isEmail().withMessage('유효한 이메일을 입력하세요.'),
        body('password').isString().notEmpty().withMessage('비밀번호를 입력하세요.'),
        body('name').notEmpty().withMessage('이름을 입력하세요.'),
        validateRequest
    ],
    register
);

module.exports = router;
