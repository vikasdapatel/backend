const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('invoiceTable', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        item: {
            type: DataTypes.STRING
        },
        hsn_sac: {
            type: DataTypes.STRING
        },
        gst: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.FLOAT
        },
        rate: {
            type: DataTypes.FLOAT
        },
        discount: {
            type: DataTypes.FLOAT
        },
        amount: {
            type: DataTypes.FLOAT
        },
        cgst: {
            type: DataTypes.FLOAT
        },
        sgst: {
            type: DataTypes.FLOAT
        },
        total: {
            type: DataTypes.FLOAT
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


