const Sequelize = require('sequelize');

const connection = new Sequelize('guia_press', 'root', 'gui051101', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;