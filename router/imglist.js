const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const qiniuUpload = require('../qiniu/upload');
const {addImg, findImgList} = require('../sql/controller/imglist');

// 创建文件夹
const createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

const uploadFolder = './upload/';
createFolder(uploadFolder);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.toLowerCase();
    if(fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/jpeg' || fileType === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
// 创建 multer 对象
const upload = multer({
    storage: storage,
    limits: {
        fields: 10,
        files: 10
    },
    fileFilter,
});

/* POST upload listing. */
router.post('/houst-img', upload.single('file'), async (req, res, next) => {
    // console.log(req);
    const {
        openid,
        houseId
    } = req.body;
    console.log(openid, houseId);
    const file = req.file;
    if(file) {
        console.log(process.cwd());
        const {mimetype, originalname, size, path: localPath} = file;
        const uploadUrl = path.join(process.cwd(), localPath);
        console.log(uploadUrl);
        const data = await qiniuUpload(uploadUrl);
        if(data) {
            const result = await addImg(openid, houseId, data, mimetype, size);
            if(result) {
                res.json({
                    code: 0,
                    msg: '上传成功!',
                    url: data
                });
                return;
            }
        } 
        res.json({
            code: 500,
            msg: '保存异常!'
        });
        return;
        // 接收文件成功后返回数据给前端   
    } else {
        res.json({
            code: 500,
            msg: '保存异常!'
        });
    }
    
});

router.get('/house-img-list', async (req, res, next) => {
    const {openid, houseId} = req.query;
    const data = await findImgList(openid, houseId);
    console.log(data);
    const list = data.map(item => {
        return item.dataValues.imglink;
    });
    if(list) {
        res.json({
            code: 0,
            data: list
        });
    } else {
        res.json({
            code: 0,
            data: []
        });
    } 
})

module.exports = router;