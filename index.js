const fs = require('fs');  //writeFile機能を使うためにfsモジュールを読み込む
const express = require("express");
const { dirname } = require('path');
const app = express();

//HTMLの<form>から投稿されたデータの中身を解析する
app.use(express.urlencoded({  
    extended: true
}));

const activities = require("./activities.json")

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});  

 //req.body.activityで投稿されたデータにアクセス
 //投稿されたデータをテキストファイルに書き込む
 //ブラウザに投稿完了のメッセージを表示
app.post("/autumn", function(req, res){
    fs.writeFile(__dirname + "/data.txt", req.body.activity, function(){
        res.send("投稿完了")
    });  
});

//activities.jsonをブラウザに表示
//０番目をupdatedActivityに入力されたデータに変更
app.post("/update", function(req, res){
    activities[0].activity = req.body.updatedActivity; 
    res.send(activities);
});


//req.body.numberで削除したい配列の番号を取得、1個削除する
app.post("/delete", function(req, res){
    activities.splice(req.body.number, 1);
    res.send(activities);
});

const port = process.env.PORT || 5000;

app.listen(port, function(){
    console.log(`Listening on ${port}`);
});