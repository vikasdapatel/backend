//
// Optional Jini app which uses Mysql
// ----------------------------------------------
//

const express = require('express')
const router = express.Router()
const utils = require('./utils')
const { models } = require('../models');
const { Op, Sequelize } = require("sequelize");
//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/employee', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.Employee.findAndCountAll({ 
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
    let result = await models.Employee.findAll({ 
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
router.post('/api/employee', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  try {
     models.Employee.create(todo).then(employee => {
      if (req.body.roles) {
        models.Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          
          employee.update({'employeeCode': Sequelize.fn('concat', 'JINI', '0000', employee.dataValues.id + 19)},{
            where: { id: employee.dataValues.id }
          })
            
          employee.setRoles(roles).then(() => {
            
            utils.sendData(res, { message: "Employee was registered successfully!" });
          });
        });
      } else {
        employee.update({'employeeCode': Sequelize.fn('concat', 'JINI', '0000', employee.dataValues.id + 19)},{
          where: { id: employee.dataValues.id }
        })
        // user role = 1
        employee.setRoles([1]).then(() => {
          utils.sendData(res, { message: "User was registered successfully!" });
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
router.put('/api/employee/:id', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  delete todo._id
  try {
    let result = await models.Employee.update(todo, {
      where: {
        id: req.params.id
      }
    });
    if (result) {
      utils.sendData(res, result)
    } else {
      throw 'Error PUTing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

// //
// // Todo API: DELETE - remove a todo from DB
// //
router.delete('/api/employee/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.Employee.destroy({
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