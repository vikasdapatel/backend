const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('clients', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
        phone: {
            type: DataTypes.STRING,
            field: 'phone_no'
        },
        mobile: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        gstno: {
            type: DataTypes.STRING,
            field: 'gst_no'
        },
        panNo: {
            type: DataTypes.STRING,
            field: 'pan_no'
        },
        portRegNo: {
            type: DataTypes.STRING,
            field: 'port_reg_no'
        },
        registrationNo: {
            type: DataTypes.STRING,
            field: 'registration_no'
        },
        constitution: {
            type: DataTypes.INTEGER,
            field: 'constitution'
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
