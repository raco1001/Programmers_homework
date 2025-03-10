const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        createReview,
        getReviewsByBookId,
        updateReview,
        deleteReview
    } = require('../controllers/ReviewController');

router
    .route('/')
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getReviews
    )
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('Review_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        createReview
    );

router
    .route('/:id')
    .post(
        [
            body('user_id').isUUID().withMessage('유효한 UUID 형식의 user_id가 필요합니다.'),
            body('Review_title').notEmpty().withMessage('채널 제목을 입력하세요.'),
            validateRequest
        ],
        createReview
    )
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getReviewsByBookId
    )
    .put(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        updateReview
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteReview
    );

module.exports = router;
