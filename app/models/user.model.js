const { sequelize, Sequelize } = require(".");
const { USER } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        ktp:{
            type: Sequelize.STRING
        }
    });
    return User;
}