const jwt = require('jsonwebtoken');
const { authenticateUser, createUser } = require('../services/authService');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);

        if (!user) {
            return res.status(403).json({ status: 'error', message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
process.env.JWT_SECRET,
        { 
                    expiresIn: '1h',
                    issuer:"jonghyun"
                }
        );

        res.cookie("token",accessToken,{httpOnly:true});
        res.status(200).json({ status: 'success', message: '로그인 성공' });
    } catch (error) {
        next(error);
    }
};


exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await createUser( name, email, password);

        res.status(201).json({ status: 'success', message: `${newUser.name}님 가입을 환영합니다!` });
    } catch (error) {
        next(error);
    }
};
