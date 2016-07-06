/**
 * Created by chris.wheeler on 7/5/16.
 */

// views/routes.js


module.exports = function(app) {

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load our public/index.html file
    });

};