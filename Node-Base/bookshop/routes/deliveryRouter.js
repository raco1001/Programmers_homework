const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        createDelivery,
        getDeliveryByOrderId,
        updateDelivery
    } = require('../controllers/DeliveryController');

router
    .route('/:id')
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('Delivery_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        createDelivery
    )
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getDeliveryByOrderId
    )
    .put(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        updateDelivery
    );

module.exports = router;
