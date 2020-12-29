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

const status = ['PENDING', 'APPROVED', 'REJECT']
//
// Todo API: GET  - return array of all todos, probably should have pagination at some point
//
router.get('/api/invitation', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.invitation.findAndCountAll({ 
      order: [
        ['createdAt', 'DESC'],
      ],
      offset: (+req.query.offset || 0),  
      limit: (+req.query.limit || 10),
      where: {
        [Op.or]: [
            {
                invitation_sender_id: +mobileUserLogin.id
            }
          ]
      },
      include: [{model: models.Users },{model: models.Visitors }]
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
router.get('/api/invitation/:inviationId', async function (req, res, next) {
  res.type('application/json')
  console.log(models);
  try {
    let result = await models.invitation.findAll({ 
      where: {
        [Op.or]: [
          {
            id : req.params.inviationId
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
router.post('/api/invitation', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body;
  todo['invitation_sender_id'] = +mobileUserLogin.id;
  todo['status'] = status[0];

  try {
    let result = await models.invitation.create(todo);
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
router.put('/api/invitation', async function (req, res, next) {
  res.type('application/json')
  let todo = req.body
  todo['check_out_by'] = +mobileUserLogin.id;
  delete todo._id
  try {
    let result = await models.invitation.update(todo, {
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

router.put('/api/invitation/checkin/:id', async function (req, res, next) {
    res.type('application/json')
    let todo = req.body
    todo['UserId'] = +todo.approve_by;
    todo['accepted_by'] = +mobileUserLogin.id;
    todo['SiteSiteId'] = +mobileUserLogin.siteId;
    todo['status'] = status[0];
  
    delete todo._id
    try {
      let result = await models.invitation.update(todo, {
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
router.delete('/api/invitation/:id', async function (req, res, next) {
  res.type('application/json')
  try {
    let result = await models.invitation.destroy({
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