//
// Optional Jini app which uses Mysql
// ----------------------------------------------
//

const express = require('express')
const router = express.Router()
const utils = require('./utils')
const { models } = require('../models');
const { Op } = require("sequelize");
const userId = 1;
//
// Todo API: GET  - return array of Single todo, probably should have pagination at some point
//
router.get('/api/invoice-settings', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.InvoiceDefault.findAll({ 
      where: {
        [Op.or]: [
          {
            UserId : userId
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
router.post('/api/invoice-settings', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  console.log(todo);
  try {
    let result = await models.InvoiceDefault.create(todo);
    if (result && result.dataValues) {
        utils.sendData(res, result.dataValues)
    } else {
      throw 'Error POSTing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

// //
// // Todo API: PUT - update a todo
// //
router.put('/api/invoice-settings/:id', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  delete todo._id
  try {
    let result = await models.InvoiceDefault.update(todo, {
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

module.exports = router