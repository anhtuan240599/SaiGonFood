const express = require("express");
const router = require("express-promise-router")();
const UserController = require("../controllers/user.controller");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verify-token");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelper");

router
  .route("/register")
  .post(validateBody(schemas.authRegisterSchema), UserController.register);

router.route("/login").post(UserController.login);

router.route("/").get(verifyToken, UserController.foundUser);

router.route("/verify-email").get(UserController.verify);

module.exports = router;
