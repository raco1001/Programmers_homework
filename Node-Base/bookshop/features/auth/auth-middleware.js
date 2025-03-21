const jwt = require("jsonwebtoken");

const validateRequestBody = (requiredFields) => {
    return (req, res, next) => {
        console.log(`[validateRequestBody] 요청 받음: ${JSON.stringify(req.body)}`);
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field} 값이 필요합니다.` });
            }
        }
        next();
    };
};

const validateTypes = (fieldTypes) => {
    return (req, res, next) => {
        for (const field in fieldTypes) {
            if (req.body[field] !== undefined && req.body[field] !== null) { 
                if (typeof req.body[field] !== fieldTypes[field]) {
                    return res.status(400).json({ message: `${field} 값의 타입이 올바르지 않습니다.` });
                }
            }
        }
        next();
    };
};

const validateAccessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Token 없음" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Access Token 유효하지 않음" });
    }
};


const validateRefreshToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh Token이 없습니다." });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "유효하지 않은 Refresh Token입니다. 다시 로그인 해주세요" });
            }
            req.userId = decoded;
        });
        
        next();
    } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        return res.status(500).json({ message: "서버 오류 발생" });
    }
};

module.exports = { validateAccessToken, validateRefreshToken, validateRequestBody, validateTypes };
