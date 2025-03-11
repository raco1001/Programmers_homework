const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        requestPayment,
    } = require('../controllers/PaymentController');

router
    .route('/')
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('Payment_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        requestPayment
    );

module.exports = router;
