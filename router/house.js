const express = require('express');
const router = express.Router();
const {addHouse, findHouse, findAllHouse} = require('../sql/model/house');

router.get('/list', (req, res) => {
    
});

router.get('/addItem', (req, res) => {
    const param = req.query;
    const {openid, location, iphone, type, logo, imgList} = param;
    console.log(param);
})

module.exports = router;
