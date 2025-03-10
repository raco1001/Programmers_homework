const express = require('express');
const router = express.Router();
const { getUserById, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 
const { validateRequest } = require('../middlewares/validationMiddleware');

router.route('/me')
    .get(authenticateToken, getUserById) 
    .delete(authenticateToken, deleteUser); 


router
    .route('/reset')
    .post('',[
        body('password').isString().notEmpty().withMessage('비밀번호를 입력하세요.'),
        validateRequest,
    ])
    .put('',[]);
    
module.exports = router;
