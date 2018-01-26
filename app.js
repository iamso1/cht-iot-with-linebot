const linebot = require('linebot');
const express = require('express');

const bot = linebot({
  channelId: '',
  channelSecret: '',
  channelAccessToken: '',
});

const app = express();
const botParser = bot.parser();

//linebot的webhook
app.post('/', botParser);

app.get('/', function(req, res) {
  res.send('hello world');
});

//這邊的 process.env.PORT  會對應到 heroku 的 80

const server = app.listen(process.env.PORT || 3000, function() {
  const port = server.address().port;
  console.log('Server now running on port', port);
});

bot.on('message', function(event) {
  //這邊會監聽line打過來的資料
  console.log(event);
});
