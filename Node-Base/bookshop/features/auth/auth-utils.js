const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const generateAccessToken = (user) => {
   return jwt.sign(
       { id: user.id, email: user.email, role: user.role },
       process.env.JWT_SECRET,
       { expiresIn: "1h", issuer: "jonghyun" }
   );
};

const generateRefreshToken = (userId) => {
   return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
       expiresIn: "7d",
       issuer: "jonghyun",
   });
};

const hashPassword = (password) => {
   const salt = crypto.randomBytes(16).toString("base64");
   const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("base64");
   return { salt, hashedPassword };
};

const verifyPassword = (password, salt, hashedPassword) => {
   const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("base64");
   return hash === hashedPassword;
};

const generateTokens = (user)=>{
   const accessToken = generateAccessToken(user);
   const refreshToken = generateRefreshToken(user.id);

   return { accessToken, refreshToken };
}


const requireAdmin = (req, res, next) => {
   if (req.user.role !== "admin") {
       return res.status(403).json({ status: "error", message: "관리자 권한이 필요합니다." });
   }
   next();
};

module.exports = { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken, generateTokens, requireAdmin };
