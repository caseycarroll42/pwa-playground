var express = require('express')
var app = express()
var path = require('path')

var static_files = path.join(__dirname, '../', 'client')

app.use(express.static(static_files))

app.get('/', function(req, res) {
    res.sendFile(path.join(static_files, 'views', 'index.html'))
})

app.listen(8080, function () {
    console.log('running on ' + 8080);
    console.log(path.join(__dirname, '../', 'client'));
})