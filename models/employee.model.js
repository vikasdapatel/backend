const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('employee', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
        mobile: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        address: {
            type: DataTypes.STRING,
            field: 'address',
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            field: 'city',
            allowNull: false
        },
        pincode: {
            type: DataTypes.STRING,
            field: 'pincode',
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: false
        },
        country: {
            type: DataTypes.INTEGER,
            field: 'country',
            allowNull: false
        },
        aadhar_card: {
            type: DataTypes.STRING,
            field: 'aadhar_card',
            allowNull: false
        },
        panNo: {
            type: DataTypes.STRING,
            field: 'pan_no',
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            field: 'type',
            allowNull: false
        },
        employeeCode: {
            type: DataTypes.STRING,
            field: 'employee_code',
            allowNull: true,
            unique: true
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