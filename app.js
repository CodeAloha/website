// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================



// set our port
var port = process.env.PORT || 3000;

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

app.set('port_https', 3443); // make sure to use the same port as above, or better yet, use the same variable
// Secure traffic only
app.all('*', function(req, res, next) {
        if (req.secure) { return next(); }
        res.redirect('https://' + req.hostname+ ':' + app.get('port_https') + req.url);
    });

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/js', { redirect : false }));
app.use('/bower_components', express.static(__dirname + '/bower_components', { redirect : false }));
app.use('/css', express.static(__dirname + '/css', { redirect : false }));
app.use('/views', express.static(__dirname + '/views' , { redirect : false }));
app.use('/assets', express.static(__dirname + '/assets', { redirect : false }));


// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Running the server at port: ' + port);

// expose app           
exports = module.exports = app;