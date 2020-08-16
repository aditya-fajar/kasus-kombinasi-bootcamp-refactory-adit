const { sequelize, Sequelize } = require(".");
const { ORDER } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        nama:{
            type: Sequelize.STRING
        },
        tanggal:{
            type: Sequelize.DATEONLY
        },
        harga:{
            type: Sequelize.FLOAT
        },
        struck:{
            type: Sequelize.STRING
        }
    });
    return Order;
}