const ImgList = require('../model/imglist');

const imglist = ImgList.sync({
    force: false
})

function addImg(openid, houseId, imglink, mimetype, size) {
    return ImgList.create({
        openid,
        houseId,
        imglink,
        mimetype,
        size
    })
}

module.exports = {
    addImg
}