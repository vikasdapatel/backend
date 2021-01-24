const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('users', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fname: {
            type: DataTypes.STRING,
            field: 'fname'
        },
        lname: {
            type: DataTypes.STRING,
            field: 'lname'
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
        password: {
            type: DataTypes.STRING,
            field: 'password'
        },
        mobile: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        // role: 1 - SuperAdmin, 2 - Admin, 3- Client, 4 - Employee
        // 1- super admin 2- admin, 3-web user admin, 4- web user, 5- mobile user, 6- mobile user admin, 7- Guard
        role: {
            type: DataTypes.INTEGER,
            field: 'role'
        },
        state: {
            type: DataTypes.STRING,
            field: 'state'
        },
        flat: {
            type: DataTypes.STRING,
            field: 'flat'
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


