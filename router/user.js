const express = require('express');
const request = require('request');
const {
    findUser,
    addUser
} = require('../sql/controller/user');
const router = express.Router();
const wxConfig = {
    AppID: 'wx9b0e913c3e69d62e',
    Secret: 'a5381fa30dacec4049dae9c8e61aaf07'
}

router.get('/getId', (req, res) => {
    const param = req.query;
    console.log(param);
    const {
        code
    } = param;
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxConfig.AppID + '&secret=' + wxConfig.Secret + '&js_code=' + code + '&grant_type=authorization_code';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const jsBody = JSON.parse(body);
            jsBody.status = 100;
            jsBody.msg = '操作成功';
            const openid = jsBody.openid;
            res.json({
                code: 200,
                openid,
            })
        }
    })
})

router.get('/login', async (req, res) => {
    const param = req.query;
    const {
        openid,
        nickName,
        gender,
        avatarUrl,
        province,
        city,
        country
    } = param;
    if (!openid) {
        res.json({
            code: 500,
            msg: '无效的openid',
        })
        return;
    }
    try {
        const result = await findUser(openid);
        console.log('result', result);
        if (!result) {
            const user = await addUser(openid, nickName, gender, avatarUrl, province, city, country);
            console.log(user);
        } else {
            res.json({
                code: 201,
                msg: '已经存在此用户',
            })
        }
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;