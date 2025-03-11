const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        createBook,
        getBookByRange,
        getBookById,
        updateBook,
        deleteBook
    } = require('../controllers/bookController');

router
    .route('/')
    .get(
        [
            
        ],
        getBookByRange
    );

router
    .route('/:id')
    .get(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        getBookById
    )
    .put(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        updateBook
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteBook
    );

module.exports = router;
