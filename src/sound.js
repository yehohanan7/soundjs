define(['underscore', 'q', 'form-data', 'fs', 'request'], function(_, Q, FormData, fs, request) {

    var api = 'https://api.soundcloud.com';

    function SoundCloud(clientId, clientSecret, userName, password, redirectUri) {

        var token = (function init() {
            var deffered = Q.defer();
            var form = new FormData();
            form.append('client_id', clientId);
            form.append('client_secret', clientSecret);
            form.append('grant_type', 'password');
            form.append('redirect_uri', redirectUri);
            form.append('username', userName);
            form.append('password', password);
            form.submit(api + '/oauth2/token', function(err, response) {
                response.on('data', function(chunk) {
                    deffered.resolve(JSON.parse(chunk.toString('utf8'))['access_token']);
                })
            });
            return deffered.promise;
        })();


        this.addTrack = function(title, description, genre, playlist, stream) {
            var soundCloud = this;
            var deffered = Q.defer();
            token.then(function(accessToken) {
                var form = new FormData();
                form.append('track[title]', title);
                form.append('track[tags]', 'tags');
                form.append('track[description]', description);
                form.append('track[genre]', genre);
                form.append('oauth_token', accessToken);
                form.append('track[asset_data]', stream);
                form.submit(api + '/playlists/' + playlist, function(err, response) {
                    if (!err) {
                        console.log('upload successful');
                        response.on('data', function(chunk) {
                            deffered.resolve(chunk.toString('utf8'));
                        })
                    } else {
                        console.log(err);
                        deffered.reject('Error while uploading track');
                    }
                });
            });
            return deffered.promise;

        }

    }

    return SoundCloud;
})