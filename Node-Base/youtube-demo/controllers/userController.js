const { getUser, removeUser } = require('../services/userService');

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.user.id;  // JWT에서 유저 ID 가져오기
        console.log("🔹 요청된 userId:", userId);
        
        const user = await getUser(userId); // `services/userService.js`의 getUser() 사용
        
        if (!user) {
            return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
        }

        res.json({ status: 'success', data: user });
    } catch (error) {
        console.error("getUserById 오류:", error);
        return next(error); // next()가 undefined가 되는 문제 해결
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await removeUser(req.params.id);
        if (result === 0) {
            return res.status(404).json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' });
        }
        res.json({ status: 'success', message: '회원이 삭제되었습니다.' });
    } catch (error) {
        return next(error);
    }
};
