const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('sites', {
        siteId: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            
        },
        siteAddress: {
            type: DataTypes.STRING,
            field: 'site_address'
        },
        city: {
            type: DataTypes.TEXT,
            field: 'city'
        },
        pincode: {
            type: DataTypes.STRING,
            field: 'pincode'
        },
        state: {
            type: DataTypes.TEXT,
            field: 'state'
        },
        contactPerson: {
            type: DataTypes.TEXT,
            field: 'contact_person'
        },
        contactPersonNo: {
            type: DataTypes.STRING,
            field: 'contact_person_no'
        },
        country: {
            type: DataTypes.INTEGER,
            field: 'country'
        },
        clientId: {
            type: DataTypes.INTEGER,
            field: 'clientId',
            unique: false
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


