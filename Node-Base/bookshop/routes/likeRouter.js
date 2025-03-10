const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const {
        createLike,
        deleteLike
    } = require('../controllers/LikeController');

router
    .route('/:id')
    .post(  
      [   
        
      ],
      createLike
    )
    .delete(
        [param('id').isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'), validateRequest],
        deleteLike
    );


module.exports = router;
