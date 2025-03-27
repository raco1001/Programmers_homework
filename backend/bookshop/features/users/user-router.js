const express = require('express');
const router = express.Router();
const {getUserById, deleteUser, authenticatUserByEmail, resetPassword} = require('./user-controller');
const {validateToken} = require('../../shared/middlewares/validateToken');
const {validateRequest} = require('../../shared/middlewares/validateRequestBody');

router
    .route('/:id')
    .get(validateToken, getUserById)
    .delete(validateToken, deleteUser); 
    
router
    .route('/reset/:email')
    .get(validateRequest, authenticatUserByEmail);

router
    .route('/reset/:id')
    .put(validateToken, resetPassword);

module.exports = router;
