const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Entry', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        inTime: {
            type: DataTypes.DATE,
            field: 'inTime',
            allowNull: false,
        },
        outTime: {
            type: DataTypes.DATE,
            field: 'outTime',
            allowNull: true
        },
        approve_by: {
            type: DataTypes.INTEGER,
            field: 'approve_by',
            allowNull: false
        },
        purpose: {
            type: DataTypes.STRING,
            field: 'purpose',
            allowNull: false
        },
        vehicalNo: {
            type: DataTypes.STRING,
            field: 'vehical_no',
            allowNull: true,
        },
        deliveredBy: {
            type: DataTypes.STRING,
            field: 'delivered_by',
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            field: 'company_name',
            allowNull: true
        },
        entryDoneBy: {
            type: DataTypes.INTEGER,
            field: 'entry_done_by',
            allowNull: true
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

(async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();
