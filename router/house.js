const express = require('express');
const router = express.Router();
const {
    addHouse,
    findHouse,
    findAllHouse,
    deleteHouse
} = require('../sql/controller/house');

router.get('/list', async (req, res) => {
    const param = req.query;
    const {
        openid
    } = param;
    const houses = await findAllHouse(openid);
    console.log(houses);
    const list = houses.map(item => {
        return item.dataValues;
    })
    res.json({
        code: 200,
        data: list
    })
    // console.log(houses.length);
});

router.get('/addItem', async (req, res) => {
    const param = req.query;
    const {
        openid,
        location,
        iphone,
        date,
        type,
        image,
        address,
        latitude,
        longitude
    } = param;
    if (!openid) {
        res.json({
            code: 500,
            msg: '用户未登陆',
        })
    }
    try {
        const houses = await findAllHouse(openid);

        if (houses.length > 9) {
            res.json({
                code: 201,
                msg: '一个房间最多上传张图片',
            })
            return;
        }
        const result = await addHouse(openid, location, iphone, date, type, image, address, latitude, longitude);
        if (result) {
            res.json({
                code: 201,
                msg: '成功',
                data: result.dataValues
            })
        }
        // console.log(result.dataValues);
    } catch (e) {
        console.log(e);
    }

})

router.get('/delete', async (req, res) => {
    const param = req.query;
    const {
        openid,
        houseId
    } = param;
    console.log(param);
    if (!openid) {
        res.json({
            code: 500,
            msg: '用户未登陆',
        })
        return;
    }
    try {
        const result = await deleteHouse(houseId);
        if (result) {
            res.json({
                code: 200,
                msg: '删除成功'
            })
            console.log(result);
        } else {
            res.json({
                code: 201,
                msg: '未找到此id'
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;