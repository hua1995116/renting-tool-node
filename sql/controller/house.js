const House = require('../model/house');
const uuidv4 = require('uuid/v4');
// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
const house = House.sync({
    force: false
});

function addHouse(openid, location, iphone, date, type, image) {
    return House.create({
        openid,
        location,
        iphone,
        date,
        type,
        image,
        houseId: uuidv4()
    });
};

function findHouse(houseId) {
    return House.findOne({
        where: {
            houseId,
        }
    });
};

function deleteHouse(houseId) {
    return House.destroy({
        where: {
            houseId,
        }
    });
}

function findAllHouse(openid) {
    return House.findAll({
        order: [
            ['updatedAt', 'DESC'],
        ],
        where: {
            openid,
        }
    })
}

module.exports = {
    addHouse,
    findHouse,
    findAllHouse,
    deleteHouse
}