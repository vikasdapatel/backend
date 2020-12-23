
const config = require("../config/auth.config");

const { models } = require('../models');
const User = models.Users;
const Role = models.Role;
const Employee = models.Employee;
const { Op, Sequelize } = require("sequelize");
const nodemailer=require('nodemailer');
const utils = require('../routes/utils');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


var email;

var otp 

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'Your mail',
      pass: 'Your pass',
    }
    
});

exports.sendOTPFORLogin = (req,res) => {
    otp = Math.random();
    otp = otp * 10000;
    otp = parseInt(otp);
    console.log(otp);
    User.findOne({
        where: {
          [Op.or]: [
            {
              mobile : req.body.mobile
            }
          ]
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          utils.sendData(res, otp);
    });
};

exports.sendOTP = (req,res) => {
    otp = Math.random();
    otp = otp * 10000;
    otp = parseInt(otp);
    console.log(otp);

    mobile=req.body.mobile;

     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
    //  transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);   
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    //     res.render('otp');
    // });
    utils.sendData(res, otp);
};

exports.verify = (req,res) => {

    if(req.body.otp==otp){
        utils.sendData(res, {msg : "You has been successfully verified"});
    }
    else{
        utils.sendData(res, {msg : 'otp is incorrect'});
    }
};  

exports.reSendOTP = (req,res) => {
    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
    //  transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);   
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //     res.render('otp',{msg:"otp has been sent"});
    // });
    utils.sendData(res, {msg:"otp has been sent"});
    
};

exports.signup = (req, res) => {
    console.log(models);
    req.body.roles = ['mobileUser']
  // Save User to Database
  User.create({
    mobile: req.body.mobile,
    fname: req.body.fname,
    emailId: req.body.emailId,
    //password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        {
          mobile : req.body.mobile
        }
      ]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

    //   var passwordIsValid = bcrypt.compareSync(
    //     req.body.password,
    //     user.password
    //   );

    //   if (!passwordIsValid) {
    //     return res.status(401).send({
    //       accessToken: null,
    //       message: "Invalid Password!"
    //     });
    //   }

      var token = jwt.sign({ id: user.id }, config.secret, {
        //expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log(user);
        utils.sendData(res, {
          id: user.id,
          mobile: user.mobile,
          emailId: user.emailId,
          flat: user.flat,
          state: user.state,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeeSignin = (req, res) => {
    Employee.findOne({
      where: {
        [Op.or]: [
          {
            employeeCode : req.body.employeeId
          }
        ]
      }
    }).then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
      //   var passwordIsValid = bcrypt.compareSync(
      //     req.body.password,
      //     user.password
      //   );
  
      //   if (!passwordIsValid) {
      //     return res.status(401).send({
      //       accessToken: null,
      //       message: "Invalid Password!"
      //     });
      //   }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          //expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
        console.log(user);
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          utils.sendData(res, {
            id: user.id,
            mobile: user.mobile,
            emailId: user.emailId,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };