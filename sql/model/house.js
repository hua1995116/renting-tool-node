const sequelize = require('../db');
const Sequelize = require('Sequelize');
const House = sequelize.define('house', {
    openid: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING
    },
    iphone: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    imgList: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    houseId: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: false
});

module.exports = House;