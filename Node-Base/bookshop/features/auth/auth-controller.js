const authService = require("./auth-service");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser(name, email, password);
        res.status(201).json({ status: "success", message: `${user.name}님 가입을 환영합니다!` });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await authService.authenticateUser(email, password);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({ status: "success", accessToken });
    } catch (error) {
        next(error);
    }
};

const updateRefreshToken = async (req, res, next) => {
    try {        
        const accessToken = await authService.refreshToken(req.user);
        res.status(200).json({ status: "success", accessToken });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken"); 
    res.status(200).json({ status: "success", message: "로그아웃 완료" });
};


module.exports = { register , login, updateRefreshToken, logout };