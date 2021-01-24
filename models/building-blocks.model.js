const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('buildingBlocks', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        blockName: {
            type: DataTypes.STRING,
            field: 'block_name'
        },
        flats: {
            type: DataTypes.STRING,
            field: 'flats'
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
	}, {
        timestamps: true
    });
};


