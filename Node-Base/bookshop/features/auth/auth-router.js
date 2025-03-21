const express = require("express");
const router = express.Router();
const authMiddleware = require("./auth-middleware");
const authController = require("./auth-controller");
const joinFields = ["name","email","password"];
const joinType = {name: "string", email: "string", password: "string"};
const loginFields = ["email", "password"];
const loginType = {email: "string", password: "string"};


router
   .post(
      "/join", 
      authMiddleware.validateRequestBody(joinFields), 
      authMiddleware.validateTypes(joinType), 
      authController.register);

router
   .post(
      "/login", 
      authMiddleware.validateRequestBody(loginFields),
      authMiddleware.validateTypes(loginType), 
      authController.login);

router
   .post(
      "/refresh", 
      authMiddleware.validateRefreshToken,authController.updateRefreshToken);

router
   .post(
      "/logout", 
      authController.logout);


module.exports = router;
