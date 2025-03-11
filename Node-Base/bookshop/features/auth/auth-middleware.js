const jwt = require("jsonwebtoken");

const validateRequestBody = (requiredFields) => {
   return (req, res, next) => {
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
           if (req.body[field] && typeof req.body[field] !== fieldTypes[field]) {
               return res.status(400).json({ message: `${field} 값의 타입이 올바르지 않습니다.` });
           }
       }
       next();
   };
};


const validateRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token이 없습니다." });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "유효하지 않은 Refresh Token입니다." });
    }
};


module.exports = { validateRefreshToken , validateRequestBody, validateTypes };
