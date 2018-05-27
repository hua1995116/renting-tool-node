const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer  = require('multer');

// 创建文件夹
const createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
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
// 创建 multer 对象
const upload = multer({ storage: storage });
/* POST upload listing. */
router.post('/houst-img', upload.array('file', 9), function(req, res, next) {
    const files = req.files;
    console.log(files);
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    res.json({res_code: '0'});
});

module.exports = router;