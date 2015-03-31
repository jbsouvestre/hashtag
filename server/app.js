/* jshint strict: false */
var Promise = require('rsvp').rsvp;
var colors = require('colors');
var config = require('./config');
var Twitter = require('twitter');
var path = require('path');

var express = require('express');

var app = express();

app.set('views', './public');
app.set('view engine', 'jade');

var stats = require('../build/stats.json');
var publicPath = stats.publicPath;

var STYLE_URL = publicPath + 'main.css?' + stats.hash;
var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];

app.use('/_assets', express.static(path.join(__dirname, '..', 'dist'), {
    maxAge: '200d'
}));

app.use('/', express.static(path.join(__dirname, '..', 'public'), {
}));


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Started server at http://%s:%s', host, port);
});

console.log(STYLE_URL, SCRIPT_URL);

app.get('/', function(req, res) {
    res.render('index', {
        STYLE_URL: STYLE_URL,
        SCRIPT_URL: SCRIPT_URL
    });
});