const express = require('express');
const linebot = require('linebot');
const lineConfig = require('./linebot-setting');
const bot = linebot(lineConfig);

const app = express();
const botParser = bot.parser();

const deviceLogic = require('./iot-logic/device');

//linebot的webhook
app.post('/', botParser);

app.get('/', function(req, res) {
  res.send('hello world');
});

//新增device
app.get('/device_add', async function(req, res) {
  const result = await deviceLogic.addDevice();
  console.log(result);
  if (result.statusCode === 200)
    res.send(`新增設備成功, 設備id為: ${result.info.id}`);
  else res.send(`新增設備失敗, 失敗原因為: ${result.info.message}`);
});

//取得設備
app.get('/device_get', async function(req, res) {
  const result = await deviceLogic.getDevice('5387289519');
  if (result.statusCode === 200)
    res.send(`取得設備成功, 設備id為: ${result.info.key}`);
  else res.send(`新增設備失敗, 失敗原因為: ${result.info.message}`);
});

//刪除設備
app.get('/device_del', async function(req, res) {
  const deviceId = '5385801655';
  const result = await deviceLogic.delDevice(deviceId);
  if (result.statusCode === 200) res.send(`刪除設備id:${deviceId}成功`);
  else res.send(`刪除設備失敗`);
});

//這邊的 process.env.PORT  會對應到 heroku 的 80
const server = app.listen(process.env.PORT || 3000, function() {
  const port = server.address().port;
  console.log('Server now running on port', port);
});

//主要監聽的部分
bot.on('message', function(event) {
  if ((event.message.type = 'text')) {
    var msg = event.message.text;
    event
      .reply(msg)
      .then(function(data) {
        // success
        console.log(msg);
      })
      .catch(function(error) {
        // error
        console.log('error');
      });
  }
});
