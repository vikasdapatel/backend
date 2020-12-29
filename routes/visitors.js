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
router.get('/api/visitors', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.visitors.findAndCountAll({ 
      include: [{model: models.Entry, include: [
        {model: models.Users}
      ] }],
      order: [
        ['createdAt', 'DESC'],
      ],
      offset: (+req.query.offset || 0),  
      limit: (+req.query.limit || 10),
      where: {
        [Op.or]: [
          {
            visitorName : {
              [Op.startsWith]: (req.query.search || '')
            }
          },{
            mobile : {
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
router.get('/api/building-blocks', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
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
router.get('/api/visitors/:visitorId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.visitors.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.visitorId
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
router.post('/api/visitors', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body;
  todo['UserId'] = +mobileUserLogin.id;
  todo['SiteSiteId'] = +mobileUserLogin.siteId;
  todo['status'] = status[1];

  try {
    let result = await models.visitors.create(todo);
    if (result && result.dataValues) {
      console.log(result);
        //models.visitors.increment('visitorId', { by: 1, where: { id: result.dataValues.id } })
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
router.put('/api/visitors/checkout/:id', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  todo['check_out_by'] = +mobileUserLogin.id;
  todo['status'] = status[1];

  delete todo._id
  try {
    let result = await models.visitors.update(todo, {
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

router.put('/api/visitors/checkin/:id', async function (req, res, next) {
    res.type('application/json')
    let todo = req.body
    todo['UserId'] = +todo.approve_by;
    todo['accepted_by'] = +mobileUserLogin.id;
    todo['SiteSiteId'] = +mobileUserLogin.siteId;
    todo['status'] = status[0];
  
    delete todo._id
    try {
      let result = await models.visitors.update(todo, {
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
router.delete('/api/visitors/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.visitors.destroy({
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