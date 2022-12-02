var axios = require("axios");
var WXBizDataCrypt = require('./WXBizDataCrypt')
// 小程序参数
const appId = 'wxe62ba547d555e505'
const appSecret = 'a25ff6cfaa268bfb332d6e01dee405f4'

function getOpenId (code = '073QIM0w32TBGZ2GGa4w3uYT3a2QIM0b') {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  return new Promise((r, j) => {
    axios.get(url).then(response => {
      if (response.status = 200) {
        r(response.data)
      } else {
        j()
      }
    })
  })
}

function decryptData (encryptedData, sessionKey = 'zqMbFL3Q5MNJY0/jmlqQIg==', iv) {
  console.log(encryptedData, sessionKey, iv)
  let pc = new WXBizDataCrypt(appId, sessionKey)
  return pc.decryptData(encryptedData, iv)
}

module.exports = {
  getOpenId,
  decryptData
}