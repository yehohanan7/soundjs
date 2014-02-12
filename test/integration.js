require('./setup');
var fs = require('fs');

var clientId = '',
    clientSecret = '',
    redirectUri = '',
    userName = '',
    password = '';

var requirejs = require('../src/config').context();
var SoundCloud = requirejs('sound');

var sc = new SoundCloud(clientId, clientSecret, userName, password, redirectUri);
sc.addTrack('test title', 'test description', 'dailyfire', 'dailyfire', fs.createReadStream('testdata/24_02_2014_T.mp3')).then(function(data) {
    console.log(data);
    done();
});