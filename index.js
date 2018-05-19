const express = require('express');
const app = express()
const router = express.Router();
const house = require('./router/house'),
      upload = require('./router/upload'),
      user = require('./router/user');

// 允许跨域访问

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});
router.get('/', function (req, res, next) {
    req.url = './index.html';
    next();
}); 
app.use(router);
app.use('/house', house);
app.use('/upload', upload);
app.use('/user', user);

app.use(express.static('./'));
const server = app.listen(7788)
