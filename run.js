var express = require("express"); //导入express
var app = express();
var bodyParser = require("body-parser"); //导入body-parser
var { getOpenId, decryptData } = require("./applet")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// 允许跨域
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //允许任何方法
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token'); //允许任何类型
  next();
};
app.use(allowCrossDomain);

//http://127.0.0.1:3000/applet 
// 获取session_key
app.post('/applet', (req, res) => {
  var { code } = req.body
  getOpenId(code).then(
    response => {
      return res.send({ code: 200, describe: "success", data: response })
    }
  )
})

//http://127.0.0.1:3000/decrypt
// 获取encryptedData解密
app.post('/decrypt', (req, res) => {
  var { encryptedData, sessionKey, iv } = req.body
  return res.send({ code: 200, describe: "success", data: decryptData(encryptedData, sessionKey, iv) })
})



const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'
app.listen(port, host, () => {
  console.log(`Server is running on http://127.0.0.1:3000`);
});