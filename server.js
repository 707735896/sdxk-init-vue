var express = require('express');
var app = express();

var home_page = '/dist/index.html';


app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + home_page);
});
 
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/' + home_page);
});
var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
