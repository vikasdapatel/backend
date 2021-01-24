const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

var path = require('path');

global.appRoot = path.resolve(__dirname);

let development_config = {
  DBNAME: process.env.JINIHANDLER_DB_NAME || 'jinisha-db',
  username: 'root',
  password: '',
  host: 'localhost',
  diselect: 'mysql'

}

let production_config = {
  DBNAME: process.env.JINIHANDLER_DB_NAME || 'jinisha-db',
  username: 'admin',
  password: 'Jinisha19',
  host: 'jinisha-db.cwrhrylalclu.us-east-2.rds.amazonaws.com',
  diselect: 'mysql'
}
const config = process.env.NODE_ENV == 'development' ? development_config : production_config;
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.DBNAME, config.username, config.password, {
  host: config.host,
  dialect: config.diselect
});

//development
// host = "jinisha-db.cwrhrylalclu.us-east-2.rds.amazonaws.com"
// DBNAME = "jinisha-db"
// usrnm = "admin"
// pswd = "Jinisha19"

 
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