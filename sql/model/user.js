const Sequelize = require('Sequelize');
const sequelize = require('../db');
// 创建 model
const User = sequelize.define('user', {
    openid: {
      type: Sequelize.STRING, // 指定值的类型
    },
    nickName: {
      type: Sequelize.STRING, // 指定值的类型
    },
    gender: {
      type: Sequelize.STRING
    },
    avatarUrl: {
      type: Sequelize.STRING
    },
    province: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

module.exports = User;