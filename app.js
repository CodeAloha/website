// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var fs             = require('fs');
var http           = require('http');
var https          = require('https');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


// configuration ===========================================



// set our port
var port = process.env.PORT || 3000;

// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

var root = '/';

app.use(root + 'js', express.static(__dirname + '/js', { redirect : false }));
app.use(root + 'bower_components', express.static(__dirname + '/bower_components', { redirect : false }));
app.use(root + 'css', express.static(__dirname + '/css', { redirect : false }));
app.use(root + 'views', express.static(__dirname + '/views' , { redirect : false }));
app.use(root + 'assets', express.static(__dirname + '/assets', { redirect : false }));


// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/javacup.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/javacup.io/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/javacup.io/chain.pem')
}, app).listen(port);
