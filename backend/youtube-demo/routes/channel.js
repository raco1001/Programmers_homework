const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
    createChannel,
    getChannelById,
    updateChannel,
    deleteChannel
} = require('../controllers/channelController');

router
    .route('/')
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('channel_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        createChannel
    );

router
    .route('/:id')
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getChannelById
    )
    .put(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        updateChannel
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteChannel
    );

module.exports = router;
