
app.controller('DonationController', function DonationsController($scope, $http, $timeout) {
    $scope.donationAmounts = [ 3, 5, 10, 25, 50, 100, 250 ];
    $scope.toggleOffVeteran = false;
    $scope.donation = null;
    $scope.total    = null;
    $scope.error    = false;
    $scope.userInfo = {};

    //DONATION, PAYMENT, INFORMATION
    $scope.progressData = {
        DONATION:    { index: "1", button: "NEXT", excerpt: "Select an amount to donate." },
        PAYMENT:     { index: "2", button: "DONATE", excerpt: "Enter payment information." },
        FOLLOWUP:    { index: "3", excerpt: "You can still help, support Johnson by spreading the word." }
    };
    $scope.mode = 'DONATION';

    $scope.applyDonation = function applyDonation(amount) {
        if (amount) { $scope.donation = amount; }
        $scope.mode  = 'PAYMENT';
        $scope.error = '';
    };


    $scope.resume = function resume() {

        switch($scope.mode) {
            case "DONATION":

                if (!/\d{1,2}(,\d{3})*(\.\d+)?/g.test($scope.donation) ) {
                    $('input[name="donation-box"]').addClass('error');
                    $scope.error = "Please enter only numbers.";
                }
                else if (/\.{1,}.{0,}\.{1,}/g.test($scope.donation)) {
                    $('input[name="donation-box"]').addClass('error');
                    $scope.error = "Please enter a valid number: Too Many decimals found.";
                }
                else if (!$scope.donation) { $('input[name="donation-box"]').addClass('error');
                    $scope.error = "Please enter a value in the donation box, or select a button.";
                } else {
                    $scope.error = '';
                    $scope.donation = $scope.donation.replace(',', '');
                    $scope.mode = "PAYMENT";
                }

                break;
            case "PAYMENT":

                var form   = $('form[name="paymentForm"]');
                var result = form.serializeJSON();
                var errorCount = 0;
                $scope.error = '';

                if (_.isEmpty(result.exp_month)) { form.find('select[name="exp_month"]').addClass('error'); errorCount++; $scope.error = "Please enter an expiration month for your credit card"; }
                if (_.isEmpty(result.number))  { form.find('input[name="number"]').addClass('error');  errorCount++; $scope.error = "Please enter your credit card number."; }
                if (_.isEmpty(result.exp_year))  { form.find('input[name="exp_year"]').addClass('error');  errorCount++; $scope.error = "Please enter an expiration year for your credit card."; }
                if (_.isEmpty(result.cvc))   { form.find('input[name="cvc"]').addClass('error');   errorCount++; $scope.error = "Please enter your CVC Code."; }

                if (result.year < 2015)  { form.find('input[name="year"]').addClass('error');  errorCount++; $scope.error = "Year must be current, or in the future."; }

                if (errorCount > 1) { $scope.error = "Please complete the fields below." }
                if (!$scope.error) {

                    result.number = result.number.replace(/-/g, '');
                    _.merge($scope.userInfo, result);
                    delete result.cc_recurring;
                    Stripe.card.createToken(result, function (status, response) {
                        if (status === 200) {
                            if (response.object === 'token') { $scope.userInfo.token = response; }
                            $scope.error = response.message;

                            $scope.userInfo.donation = $scope.donation;
                            processDonation($scope.userInfo);
                        } else {
                            var msg = response.error.message;
                            $scope.error = msg ? msg : 'Unknown Server Error.';
                            $timeout(_.noop);
                        }
                    });
                }
                break;
        }
    };

    function processDonation(donation) {
        $http({
            method: 'POST',
            url: domain + '/stripe',
            data: donation
        }).then(function successCallback(response) {
            $scope.mode = "FOLLOWUP";
        }, function errorCallback(response) {
            $scope.error = 'Server Processing Error. Please try again later.';
        });
    }



    $(document).ready(function(){
        $(":input").inputmask();
    });

});