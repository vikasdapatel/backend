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
router.get('/api/clients', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.clients.findAndCountAll({ 
      order: [
        ['createdAt', 'DESC'],
      ],
      offset: +req.query.offset,  
      limit: +req.query.limit,
      where: {
        [Op.or]: [
          {
            name : {
              [Op.startsWith]: req.query.search
            }
          },{
            email_id : {
              [Op.startsWith]: req.query.search
            }
          }
        ]
        
      },
      include: [{model: models.sites }], 
      as: "clients"
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
router.get('/api/clients/:clientId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.clients.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.clientId
          }
        ]
        
      },
      include: [{model: models.sites }], 
      as: "clients"
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
router.post('/api/clients', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  try {
    let result = await models.clients.create(todo);
    if (result && result.dataValues) {
      if(todo.sites.length) {
        todo.sites.forEach(site => {
          site['clientId'] = result.dataValues.id
          setSites(site, result, res);
        });
      }else {
        utils.sendData(res, result.dataValues)
      }
      
    } else {
      throw 'Error POSTing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

async function setSites(site, result, res) {
  try {
    let sites = await models.sites.create(site);
    if (sites && sites.dataValues) {
      result.dataValues['sites'] = sites.dataValues;
    }
    utils.sendData(res, result.dataValues)
  } catch (err) {
    utils.sendError(res, err)
  }
  
}

// //
// // Todo API: PUT - update a todo
// //
router.put('/api/clients/:id', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  delete todo._id
  try {
    let result = await models.clients.update(todo, {
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
router.delete('/api/clients/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.clients.destroy({
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