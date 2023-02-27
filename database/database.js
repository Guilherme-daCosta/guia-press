const Sequelize = require('sequelize');

const connection = new Sequelize('guia_press', 'root', 'gui051101', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;