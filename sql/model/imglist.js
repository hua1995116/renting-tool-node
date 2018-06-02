const sequelize = require('../db');
const Sequelize = require('Sequelize');
const ImgList = sequelize.define('imglist', {
    openid: {
      type: Sequelize.STRING,
    },
    houseId: {
      type: Sequelize.STRING
    },
    imglink: {
      type: Sequelize.STRING
    },
    mimetype: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: false
});

module.exports = ImgList;