const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define("roles", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        name: {
          type: DataTypes.STRING
        }
      }, {
        timestamps: false,
        freezeTableName: true
    });
};

