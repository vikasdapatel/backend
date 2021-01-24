//
// Optional Jini app which uses Mysql
// ----------------------------------------------
//

const express = require('express')
const router = express.Router()
const utils = require('./utils')
const { models } = require('../models');
const { Op, Sequelize } = require("sequelize");
var multer = require('multer');
const fs = require('fs');
const path = require('path')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './models/uploads');
   },
  filename: function (req, file, cb) {
      cb(null , "Photo" + '_' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({dest:'/models/uploads/', storage: storage});
//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/employee', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.employee.findAndCountAll({ 
      order: [
        ['createdAt', 'DESC'],
      ],
      offset: (+req.query.offset || 0),  
      limit: (+req.query.limit || 10),
      where: {
        [Op.or]: [
          {
            name : {
              [Op.startsWith]: (req.query.search || '')
            }
          },{
            email_id : {
              [Op.startsWith]: (req.query.search || '')
            }
          }
        ]
        
      }
    });
    if (!result) {
      utils.sendData(res, [])
    } else {
      utils.sendData(res, result)
      
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})


//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/employee/:employeeId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.employee.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.employeeId
          }
        ]
        
      }
    });
    if (!result) {
      utils.sendData(res, [])
    } else {
      utils.sendData(res, result[0])
      
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

//
// Todo API: POST - create or edit a new todo
//
router.post('/api/employee', upload.single('file'), (req, res, next) => {
  //res.type('application/json');

  let todo = req.body
  console.log(todo);
  try {
    const file = global.appRoot + '/uploads/' + "Photo" + '_' + Date.now() + path.extname(req.file.filename);
    const uploadFilePath = '/images/' + "Photo" + '_' + Date.now() + path.extname(req.file.filename);
    fs.rename(req.file.path, file, function(err) {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      } 
      else {
        models.employee.create(todo).then(employee => {
          if (req.body.roles) {
            models.Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles
                }
              }
            }).then(roles => {
              
              employee.update({
                'employeeCode': Sequelize.fn('concat', 'JINI', '0000', employee.dataValues.id + 19),
                'img': uploadFilePath
              },{
                where: { id: employee.dataValues.id }
              })
                
              employee.setRoles(roles).then(() => {
                
                utils.sendData(res, { message: "Employee was registered successfully!" });
              });
            });
          } else {
            employee.update({
              'employeeCode': Sequelize.fn('concat', 'JINI', '0000', employee.dataValues.id + 19),
              'img': uploadFilePath
            },{
              where: { id: employee.dataValues.id }
            })
            // user role = 1
            employee.setRoles([1]).then(() => {
              utils.sendData(res, { message: "User was registered successfully!" });
            });
          }
         });
      }
    });
     
  } catch (err) {
    utils.sendError(res, err)
  }
})

// //
// // Todo API: PUT - update a todo
// //
router.put('/api/employee/:id', upload.single('file'), async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  delete todo._id;
  if(req.file) {
    const file = global.appRoot + '/uploads/' + "Photo" + '_' + Date.now() + path.extname(req.file.filename);
    const uploadFilePath = '/images/' + "Photo" + '_' + Date.now() + path.extname(req.file.filename);
    
    try {
      fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } 
        else {
          console.log(err);
          todo['img'] = uploadFilePath;
          models.employee.update(todo, {
            where: {
              id: req.params.id
            }
          }).then(result => {
            if (result) {
              utils.sendData(res, result)
            } else {
              throw 'Error PUTing todo'
            }
          })
        }
      });
      
    } catch (err) {
      utils.sendError(res, err)
    }
  }else {
    try {
      models.employee.update(todo, {
        where: {
          id: req.params.id
        }
      }).then(result => {
        if (result) {
          utils.sendData(res, result)
        } else {
          throw 'Error PUTing todo'
        }
      })
      
    } catch (err) {
      utils.sendError(res, err)
    }
  }
  
})

// //
// // Todo API: DELETE - remove a todo from DB
// //
router.delete('/api/employee/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.employee.destroy({
      where: {
        id: req.params.id
      },
      onDelete: 'CASCADE'
    });
    if (result) {
      utils.sendData(res, { msg: `Deleted doc success!!` })
    } else {
      throw 'Error DELETEing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

module.exports = router