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

app.get('/device_add', async function(req, res) {
  const result = await deviceLogic.addDevice();
  console.log(result);
  res.send('');
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
