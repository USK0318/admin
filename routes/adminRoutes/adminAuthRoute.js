const adminAuthRouter = require("express").Router();
const adminAuthController = require("../../controllers/adminControllers/adminAuthController.js");

adminAuthRouter.get("/login", adminAuthController.index);
adminAuthRouter.post("/loginpost", adminAuthController.login);
adminAuthRouter.get("/logout", adminAuthController.logout);
adminAuthRouter.get("/forgot", adminAuthController.forgot);
adminAuthRouter.post("/sendotp", adminAuthController.sendOtp);
adminAuthRouter.get("/otp",adminAuthController.otpGet);
adminAuthRouter.post("/verifyotp",adminAuthController.verifyOtp);
adminAuthRouter.get("/updatepassword", adminAuthController.updatePasswordGet);
adminAuthRouter.post("/updatepassword", adminAuthController.updatePasswordPost);

module.exports = adminAuthRouter;