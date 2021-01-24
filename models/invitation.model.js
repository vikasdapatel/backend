const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('invitation', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        invitation_description: {
            type: DataTypes.STRING,
            field: 'invitation_description'
        },
        invitation_sender_id: {
            type: DataTypes.STRING,
            field: 'invitation_sender_id'
        },
        status: { 
            type: DataTypes.STRING,
            field: 'status'
        },
        VisitorId: {
            type: DataTypes.INTEGER
        },
        UserId: {
            type: DataTypes.INTEGER
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


