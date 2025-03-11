const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        createCart,
        getCartByUserId,
        updateCart,
        deleteCart
    } = require('../controllers/cartController');

router
    .route('/')
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('Cart_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        createCart
    );

router
    .route('/:id')
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getCartByUserId
    )
    .put(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        updateCart
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteCart
    );

module.exports = router;
