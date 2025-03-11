const express = require('express');
const router = express.Router();
const {getUserById, deleteUser, authenticatUserByEmail, resetPassword} = require('userController');

router
    .route('/:id')
    .get(authenticateToken, getUserById)
    .delete(authenticateToken, deleteUser); 
    

router
    .route('/reset/:email')
    .get(authenticateToken, authenticatUserByEmail);

router
    .route('/reset/:id')
    .put(authenticateToken, resetPassword) 
module.exports = router;
