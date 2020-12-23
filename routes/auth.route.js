const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  
  app.post("/api/auth/sendOTPForLogin", controller.sendOTPFORLogin);
  app.post("/api/auth/sendOTP", controller.sendOTP);
  app.post("/api/auth/verify", controller.verify);
  app.post("/api/auth/resendOTP", controller.reSendOTP);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/employeeSignin", controller.employeeSignin)
};