const qiniu = require('qiniu');
const path = require('path');
const configStatic = require('./config');
const accessKey = configStatic.accessKey;
const secretKey = configStatic.secretKey;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


const options = {
  scope: 'renting',
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone[configStatic.zone];


const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 文件上传
/**
 * 
 * 
 * @param {String} url 
 * @returns {Promise} 
 */
function upload(url) {
  const name = path.basename(url);
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, name, url, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        resolve(`http://p9p788xph.bkt.clouddn.com/${name}`);
      } else {
        reject(null);
      }
    });
  })
}

module.exports = upload;