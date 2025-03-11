const express = require('express');
const router = express.Router();
const { getUserById, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

router.route('/me')
    .get(authenticateToken, getUserById)
    .delete(authenticateToken, deleteUser); 

module.exports = router;
