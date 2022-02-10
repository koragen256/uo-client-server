var http = require('http');
const fs =require('fs')
var querystring = require('querystring');
var url = require('url');

function ccfg(cf) {
  let masterData2 = JSON.stringify(codel, null, ' ')
  fs.writeFileSync('./codes.json', masterData2);
  codel = require('./codes.json');
  console.log(codel);
}

var server = http.createServer(function(req, res) {
  console.log("1");
	// '/'にアクセス index.html(テスト用のGET/POSTフォーム)を表示
	if (req.url === '/' && req.method === 'GET') {
		res.statusCode = 500;
		res.end('UNKO');
	}
	// '/postPage'にアクセス かつ POSTリクエストだったら
	else if (req.url === '/postPage' && req.method === 'POST') {
	    var data = '';
	    //readableイベントが発火したらデータにリクエストボディのデータを追加
	    req.on('readable', function(chunk) {
		    data += req.read();
		});
	    //リクエストボディをすべて読み込んだらendイベントが発火する。
	    req.on('end', function() {
		    //パースする
		    querystring.parse(data);
		    res.end(data);
		});
	}
	// '/getPage'にアクセス かつ GETリクエストだったら
	else if (req.url.indexOf('/getID') == 0 && req.method === 'GET') {
	    res.end("str");
	  } else {
	    res.statusCode = 404;
	    res.end('NotFound');
	}
});

// localhostの8000番ポートでサーバーを起動する
server.listen(8080);