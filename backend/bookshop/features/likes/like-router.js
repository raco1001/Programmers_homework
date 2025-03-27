const express = require('express');
const router = express.Router();
const { addLike, removeLike} = require('./like-controller');


router
    .route('/likes')
    .post(
      addLike
    )
    .delete(
      removeLike
    );

module.exports = router;
