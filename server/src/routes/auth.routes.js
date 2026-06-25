const authController = require("../controllers/auth.controller");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/user", authController.registerUser);
authRouter.get("/getuser", authController.getUser);
authRouter.post("/loginUser", authController.loginUser);
authRouter.get("/generateNewTokens", authController.generateNewTokens);
authRouter.get("/logoutAll", authController.logoutAll);
authRouter.get("/logoutCurrentDevice", authController.logoutCurrentDevice);
authRouter.patch("/updateUser", authController.updateUser);


module.exports = authRouter;
