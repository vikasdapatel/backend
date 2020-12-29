//
// Optional Jini app which uses Mysql
// ----------------------------------------------
//

const express = require('express')
const router = express.Router()
const utils = require('./utils')
const { models } = require('../models');
const { Op } = require("sequelize");
//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/invoice', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.invoice.findAndCountAll({ 
      order: [
        ['createdAt', 'DESC'],
      ],
      offset: (+req.query.offset || 0),  
      limit: (+req.query.limit || 10),
      where: {
        [Op.or]: [
          {
            bill_to_business : {
              [Op.startsWith]: (req.query.search || '')
            }
          },{
            total : {
              [Op.startsWith]: (req.query.search || '')
            }
          },{
            code : {
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
router.get('/api/invoice/:invoiceId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.invoice.findAll({ 
      where: {
        [Op.or]: [
          {
            id : +req.params.invoiceId
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
router.post('/api/invoice', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  console.log(todo);
  try {
    let result = await models.invoice.create(todo);
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
router.put('/api/invoice/:id', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  delete todo._id
  try {
    let result = await models.invoice.update(todo, {
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
router.delete('/api/invoice/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.invoice.destroy({
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