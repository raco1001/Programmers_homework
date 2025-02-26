const { authenticateUser, createUser } = require('../services/authService');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);

        if (!user) {
            return res.status(401).json({ status: 'error', message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        res.json({ status: 'success', message: `${user.name}님 환영합니다!`, data: user });
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { id, name, email, password, role } = req.body;
        const newUser = await createUser(id, name, email, password, role);

        res.status(201).json({ status: 'success', message: `${newUser.name}님 가입을 환영합니다!` });
    } catch (error) {
        next(error);
    }
};
