const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');


const DBNAME = process.env.JINIHANDLER_DB_NAME || 'jinisha_management'

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DBNAME, 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
 
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const modelDefiners = [
  require('./client.model'),
  require('./sites.model'),
  require('./employee.model'),
  require('./invoice.model'),
  require('./invoice-table.model'),
  require('./invoice-default.model'),
  require('./user.model'),
  require('./visitors.model'),
  require('./entry.model'),
  require('./building-blocks.model'),
  require('./invitation.model'),
  require('./role.model')
	// Add more models here...
	// require('./models/item'),
];

// Sync all models that are not 
// already in the database 
//sequelize.sync() 

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}


// 1- super admin 2- admin, 3-web user admin, 4- web user, 5- mobile user, 6- mobile user admin, 7- Guard
sequelize.ROLES = ["superAdmin", "admin", "webUser", "mobileUser", "mobileUserAdmin", "Guard"];

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;