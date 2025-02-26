const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <TOKEN>"
    if (!token) {
        return res.status(401).json({ status: 'error', message: '인증 토큰이 없습니다.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: '유효하지 않은 토큰입니다.' });
        }
        req.user = user;
        next();
    });
};
