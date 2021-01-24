const { Sequelize, DataTypes, Model } = require('sequelize');


// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('invoiceDefault', {
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
        code: {
            type: DataTypes.STRING
        },
        prefix: {
            type: DataTypes.STRING
        },
        logo: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        due_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        bill_by_txt: {
            type: DataTypes.STRING
        },
        bill_by_email: {
            type: DataTypes.STRING
        },
        bill_by_mobile: {
            type: DataTypes.STRING
        },
        bill_by_business: {
            type: DataTypes.STRING
        },
        bill_by_address: {
            type: DataTypes.STRING
        },
        bill_by_city: {
            type: DataTypes.STRING
        },
        bill_by_postal: {
            type: DataTypes.STRING
        },
        bill_by_state: {
            type: DataTypes.STRING
        },
        bill_by_country: {
            type: DataTypes.INTEGER
        },
        bill_by_pan: {
            type: DataTypes.STRING
        },
        bill_by_gst: {
            type: DataTypes.STRING
        },
        bill_to_txt: {
            type: DataTypes.STRING
        },
        bill_to_email: {
            type: DataTypes.STRING
        },
        bill_to_mobile: {
            type: DataTypes.STRING
        },
        bill_to_business: {
            type: DataTypes.STRING
        },
        bill_to_address: {
            type: DataTypes.STRING
        },
        bill_to_city: {
            type: DataTypes.STRING
        },
        bill_to_postal: {
            type: DataTypes.STRING
        },
        bill_to_state: {
            type: DataTypes.STRING
        },
        bill_to_country: {
            type: DataTypes.INTEGER
        },
        bill_to_pan: {
            type: DataTypes.STRING
        },
        bill_to_gst: {
            type: DataTypes.STRING
        },
        isShippingInclude: {
            type: DataTypes.BOOLEAN
        },
        shipTo_business_name: {
            type: DataTypes.STRING
        },
        shipTo_address: {
            type: DataTypes.STRING
        },
        shipTo_city: {
            type: DataTypes.STRING
        },
        shipTo_postal: {
            type: DataTypes.STRING
        },
        shipTo_state: {
            type: DataTypes.STRING
        },
        shipTo_country: {
            type: DataTypes.INTEGER
        },
        shipTo_gst: {
            type: DataTypes.STRING
        },
        chalan_no: {
            type: DataTypes.STRING
        },
        chalan_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        transport: {
            type: DataTypes.STRING
        },
        shipping_note: {
            type: DataTypes.STRING
        },
        currency_no: {
            type: DataTypes.INTEGER
        },
        isAddGst: {
            type: DataTypes.BOOLEAN
        },
        amount: {
            type: DataTypes.FLOAT
        },
        SGST: {
            type: DataTypes.FLOAT
        },
        CGST: {
            type: DataTypes.FLOAT
        },
        total: {
            type: DataTypes.FLOAT
        },
        t_and_c: {
            type: DataTypes.STRING
        },
        signature_image: {
            type: DataTypes.STRING
        },
        signature_lable: {
            type: DataTypes.STRING
        },
        discount: {
            type: DataTypes.FLOAT
        },
        isDiscountAdd: {
            type: DataTypes.BOOLEAN
        },
        isAddOwnBankAc: {
            type: DataTypes.BOOLEAN
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

