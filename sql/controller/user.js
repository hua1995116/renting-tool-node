const User = require('../model/user');
// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
const user = User.sync({
    force: false
});

// 添加新用户
function addUser(openid, nickName, gender, avatarUrl, province, city, country) {
    // 向 user 表中插入数据
    return User.create({
        openid,
        nickName,
        gender,
        avatarUrl,
        province,
        city,
        country
    });
};

// 通过用户名查找用户
function findUser(openid) {
    return User.findOne({
        where: {
            openid,
        }
    });
};

module.exports = {
    addUser,
    findUser
}