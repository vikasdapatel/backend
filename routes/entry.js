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

const status = ['INSIDE', 'PENDING FOR APPROVAL', 'OUTSIDE']
//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/entry', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.entry.findAndCountAll({ 
      order: [
        ['createdAt', 'DESC'],
      ],
        //attributes: [
        //Sequelize.fn('count', Sequelize.col('visitor_id'))], 
        group: ["visitor_id"],
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
          },{
            entryId : {
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
router.get('/api/entry/:entryId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.entry.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.entryId
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
});

//
// Todo API: POST - create or edit a new todo
//
router.post('/api/entry', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body;
  todo['entry_done_by'] = +mobileUserLogin.id;

  try {
    let result = await models.entry.create(todo);
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
router.put('/api/entry', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  todo['check_out_by'] = +mobileUserLogin.id;
  delete todo._id
  try {
    let result = await models.entry.update(todo, {
      where: {
        id: req.params.id
      }
    });
    if (result) {
      //changeStatus(1, todo.VisitorId);
      utils.sendData(res, result)
    } else {
      throw 'Error PUTing todo'
    }
  } catch (err) {
    utils.sendError(res, err)
  }
})

function changeStatus(index, VisitorId) {
  models.Visitors.update({ status: status[index] }, {
    where: {
      id: VisitorId
    }
  });
}

router.put('/api/entry/checkin/:id', async function (req, res, next) {
    res.type('application/json')
    let todo = req.body
    todo['userId'] = +todo.approve_by;
    todo['accepted_by'] = +mobileUserLogin.id;
    todo['siteSiteId'] = +mobileUserLogin.siteId;
    todo['status'] = status[0];
  
    delete todo._id
    try {
      let result = await models.entry.update(todo, {
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
router.delete('/api/entry/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.entry.destroy({
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