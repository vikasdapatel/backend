//
// Optional Jini app which uses Mysql
// ----------------------------------------------
//

const express = require('express')
const router = express.Router()
const utils = require('./utils')
const { models } = require('../models');
const { Op, Sequelize } = require("sequelize");

const mobileUserLogin = {
    id: 1,
    siteId: 21
}

const status = ['INSIDE', 'OUTSIDE']


//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/building-blocks', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.BuildingBlocks.findAndCountAll({
      where: {
        SiteSiteId: +mobileUserLogin.siteId
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
router.get('/api/building-blocks/:siteId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.BuildingBlocks.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.siteId
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
router.post('/api/building-blocks', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body;
  todo['SiteSiteId'] = +mobileUserLogin.siteId;
  todo['flats'] = todo.flats.toString();

  try {
    let result = await models.BuildingBlocks.create(todo);
    if (result && result.dataValues) {
        utils.sendData(res, result.dataValues)
    } else {
      throw 'Error POSTing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})


router.put('/api/building-blocks/:id', async function (req, res, next) {
    res.type('application/json')
    let todo = req.body
    delete todo._id
    try {
      let result = await models.BuildingBlocks.update(todo, {
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
router.delete('/api/building-blocks/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.BuildingBlocks.destroy({
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