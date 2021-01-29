const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

var path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

global.appRoot = path.resolve(__dirname);

let sequelize;
if (env == 'production' || env == 'development') {
  // From the environment, extract the key with the name provided in the config as use_env_variable
  // and use that to establish a connection to our database.
  sequelize = new Sequelize(process.env[config.use_env_variable],
    {
      dialect: 'postgres',
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      }
    });
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}
 
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