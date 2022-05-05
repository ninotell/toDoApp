const mysql = require("mysql")
const { Sequelize } = require('sequelize');

db = new Sequelize('ensolverschallenge', 'challengeuser', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = db