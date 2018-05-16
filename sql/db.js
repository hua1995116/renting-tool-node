const Sequelize  = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
      host: config.db.host,
      dialect: config.db.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
);