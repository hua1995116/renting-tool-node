var user = require('./db');

// 添加用户
user.addUser('jack', 'jack@163.com').then(function() {
    // 查询新添加的用户
    return user.findByName('jack');
}).then(function(user) {
    console.log('****************************');
    console.log('user name: ', user.userName);
    console.log('user email: ', user.email);
});