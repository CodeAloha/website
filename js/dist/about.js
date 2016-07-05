app.controller('AboutController', function($scope) {
    $scope.competencies = {
        "Front-End Development": {
            strong: [
                'HTML5',
                'CSS3',
                'SASS',
                'Javascript',
                'Hardware Acceleration',
                'jQuery',
                'D3.js',
                'Angular.js',
                'Angular 2',
                'Web Sockets',
                'AJAX',
                'JSON',
                'REST',
                'UI / UX',
                'Caching',
                'WebGL',
                'HTML Canvas',
                'bower',
                'Unit testing',
                'Cordova PhoneGap',
                'Responsive Design',
                'i18n'
            ],
            worked: [
                'LESS',
                'Hardware Acceleration',
                'Material Design',
                'React.js'
            ],
            outdated: [
                'XML',
                'Boostrap',
                'Flash',
                'SOAP'
            ]
        },

        "Back-End Development": {
            strong: [ 'REST APIs', 'Python', 'Flask', 'SciPy', 'Quantopian', 'SQL Scripting',  'PHP', 'Laravel', 'mongodb', 'MySQL', 'Cassandra', 'Node.js', 'Express', 'npm' ],
            worked: [ 'Social Media Auth', 'PostGreSQL', 'Security', 'Payment Processing', 'SSL' ],
            outdated: [ 'phpMyAdmin', 'wordpress', 'perl' ]
        },

        "Programming Competencies": {
            strong: [ 'Big O/U', 'Object Oriented Programming', 'Linked-Lists', 'Queues', 'Stacks', 'Trees', 'Graph Theory'  ],
            worked: [ 'Cryptography' ],
            outdated: [  ]
        },

        "Miscellaneous": {
            strong: [ 'MVC (Model View Controller)', 'Git (SVN)', 'Shell Scripting (UNIX)', 'PowerShell (Windows)', 'Heroku', 'Amazon AWS' ],
            worked: [ 'PostGreSQL', 'Security' ],
            outdated: [ 'phpMyAdmin', 'wordpress', 'perl' ]
        }

    }
});