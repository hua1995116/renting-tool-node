const ImgList = require('../model/imglist');

const imglist = ImgList.sync({
    force: false
})

function addImg(openid, houseId, imglink) {
    return ImgList.create({
        openid,
        houseId,
        imglink
    })
}

module.exports = {
    addImg
}