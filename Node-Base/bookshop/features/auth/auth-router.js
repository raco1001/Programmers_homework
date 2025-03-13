const express = require("express");
const router = express.Router();
const authMiddleware = require("./auth-middleware");
const authController = require("./auth-controller");
const joinFields = ["name","email","password"];
const loginFields = ["email", "password"];


router.post("/join", authMiddleware.validateRequestBody(joinFields), authController.register);
router.post("/login", authMiddleware.validateRequestBody(loginFields), authController.login);

router.post("/refresh", authMiddleware.validateRefreshToken, authController.updateRefreshToken); // token 들의 상태에 따라 다른 리턴값!
router.post("/logout", authController.logout);


module.exports = router;
