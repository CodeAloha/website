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

    app.get('/projects', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load our public/index.html file
    });

    app.get('/about', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load our public/index.html file
    });

    app.get('/stocks', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load our public/index.html file
    });

    app.get('/contact', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load our public/index.html file
    });


    app.post('/api/v1/stripe', function(req, res) {
        if (!req.body) { return; }
        var obj = req.body || {};

        //Invalid donation
        if (!obj.donation && !parseFloat(obj.donation)) {
            res.send({ 'type': 'error', 'message': 'Donation amount not provided.' });
            return;
        }

        var plan = false;
        //check if recurring plan
        if (obj.cc_recurring) {
            plan = guid();

            stripe.plans.create({
                amount: convertToInt(obj.donation * 100),
                interval: "month",
                name: "JW2016 Donation Form $" + (convertToInt(obj.donation * 100) / 100) + " Recurring Donation",
                currency: "usd",
                id: plan
            }, function(err, plan) {
                // asynchronously called
            });


            function guid() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

        }

        var user = {
            source: obj.token.id,
            email: obj.email,
            metadata: {
                name: obj.name,
                first_name: obj.firstName,
                last_name:  obj.lastName,
                veteran: obj.veteran ? true : false,
                employment: obj.employment,
                occupation: obj.occupation
            }
        };
        if (plan) { user.plan = plan; }

        //Create a new customer and then a new charge for that customer:
        stripe.customers.create(user).then(function(customer) {
            if (plan) { return; }
            return stripe.charges.create({
                amount: convertToInt(obj.donation * 100) || 0,
                currency: 'usd',
                customer: customer.id
            });
        }).then(function(charge) {
            res.send({ 'type': 'success', 'message': charge });
        }).catch(function(err) {
            res.send({ 'type': 'error', 'message': 'Payment could not be processed.' });
        });

        function convertToInt(num) {
            return Math.round(num);
        }

    });

};