const express = require('express');
const request = require('request');
const fs = require('fs');
const multer  = require('multer');
const app = express()
const router = express.Router();
const wxConfig = {
    AppID: 'wx9b0e913c3e69d62e',
    Secret: 'a5381fa30dacec4049dae9c8e61aaf07'
}

router.get('/', function (req, res, next) {
    req.url = './index.html';
    next();
});
app.use(router);

// 允许跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});

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

// 创建 multer 对象
const upload = multer({ storage: storage });

/* POST upload listing. */
app.post('/upload', upload.single('file'), function(req, res, next) {
    const file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    res.json({res_code: '0'});
});

app.get('/list/house', (req, res) => {
    
});


app.get('/user/login', (req, res) => {
    const param = req.query;
    console.log(param);
    const { code } = param;
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxConfig.AppID + '&secret=' + wxConfig.Secret + '&js_code=' + code + '&grant_type=authorization_code';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const jsBody = JSON.parse(body);
            jsBody.status = 100;
            jsBody.msg = '操作成功';
            console.log(JSON.stringify(jsBody));
            // res.end(JSON.stringify(jsBody));
        }
    })
    res.json({
        code: 200
    })
})

app.use(express.static('./'));
const server = app.listen(7788)
