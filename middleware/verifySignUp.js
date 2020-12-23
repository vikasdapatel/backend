const { models } = require('../models');
const User = models.Users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      mobile: req.body.mobile
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Mobile number is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        emailId: req.body.emailId
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;