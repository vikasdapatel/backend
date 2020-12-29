const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('visitors', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        visitorName: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            field: 'mobile',
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            field: 'address',
            allowNull: true,
        },
        feedback: {
            type: DataTypes.STRING,
            field: 'registration_no'
        },
        feedbackNo: {
            type: DataTypes.STRING,
            field: 'feedback_no'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status',
            allowNull: false
        },
        visitorType: {
            type: DataTypes.INTEGER,
            field: 'visitor_type',
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            field: 'photo',
            allowNull: false
        },
        visitorId: {
            type: DataTypes.INTEGER,
            field: 'visitor_id',
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
