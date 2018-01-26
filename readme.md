# CHT iot 大平台 API + lineBot 範例

---

## API 端

### 使用方式

專案抓下來後, 執行下列指令

```js
yarn install
```

note:
如果沒有裝 yarn 需先安裝, 若是 windows 請直接去官網抓 yarn 的 .msi 來安裝

### 設定

1. 修改路徑中的 ./linebot-setting.js 中的參數, 參數可從 line Developers> Basic information 中找到

```js
module.exports = {
  channelId: '',
  channelSecret: '',
  channelAccessToken: '',
};
```

### 部署方式

因為需部署成 https 才能讓 Line 進行 webhook, 因此我們可以透過下列兩個方式(擇一即可) 進行部署

1. 使用 [ngrok](<(https://ngrok.com/download)>) 當 host, 此方法可以在本機測

   windows:

   下載檔案下來是一個執行檔, 開啟之後會是一個小黑窗, 輸入

   > ngrok http 3000 //port 是看你 API 聽哪個 port, 本範例是 3000

   執行後會看到下列的清單, 可以看到已經有提供 https 的網址

   > Version 2.2.8
   > Region United States (us)
   > Web Interface http://127.0.0.1:4040
   > Forwarding http://00ba8663.ngrok.io -> localhost:3000
   > Forwarding https://00ba8663.ngrok.io -> localhost:3000

   接著只要在本機執行 API 專案, 外部就可以透過 https://00ba8663.ngrok.io 對你的 API 進行存取

2) 使用 heroku

   #### step 1:

   前往 heroku dashboard 新增一個 app
   https://dashboard.heroku.com <- 進入後 右上角有一個 new 可以新增 app

   假設我們取名為 cht-iot-app

   #### step 2:

   [安裝 heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

   #### step 3:

   登入 heroku

   在終端機輸入

   > herolu login

   會請你輸入 heroku 的帳號密碼

   #### step 4:

   進入本 API 專案目錄, 並在終端機輸入下列指令

   > // 輸入你目前 API 專案的資料夾
   > $ cd my-project/
   > $ git init
   > // 這裡要輸入你剛剛創建的 app 名稱, 本範例為 cht-iot-app
   > $ heroku git:remote -a cht-iot-app
   > //增加 commit 推上去 heroku
   > $ git add .
   > $ git commit -am "first commit"
   > $ git push heroku master

   當 push 完後, 就完成部署了, 這個 app 的網址即為https://cht-iot-app.herokuapp.com/

   若不知道 app 的網址, 可以在 heroku 的 dashboard 右上角的 open app 開啟後得到網址, 外部即可使用此網址進行存取

## Line 端

### 設定 webhook

這步是要在 line developer 上設定

> 1. Use webhooks: 這個要先 enable
> 2. Webhook URL: 完成第一步後再開啟這個, 並把 API 對外的網址輸入
> 3. Auto-reply messages: 這個可以關掉, 不然都一直亂回覆

## 其他參考資源

1. Linebot https://www.npmjs.com/package/linebot
