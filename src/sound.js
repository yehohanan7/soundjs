define(['underscore', 'q', 'form-data', 'fs', 'request', 'PlayList', 'Track', 'paths'], function(_, Q, FormData, fs, request, PlayList, Track, path) {


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
            form.submit(path('access_token'), function(err, response) {
                response.on('data', function(chunk) {
                    deffered.resolve(JSON.parse(chunk.toString('utf8'))['access_token']);
                })
            });
            return deffered.promise;
        })();

        this.playlists = function() {
            var deffered = Q.defer();
            token.then(function(accessToken) {
                var uri = path('playlists', {
                    'oauth_token': accessToken
                });
                request(uri, function(err, response) {
                    if (err) {
                        deffered.reject('error while getting playlists..');
                    } else {
                        var xs = JSON.parse(response['body']);
                        var playlists = _.map(xs, function(x) {
                            return new PlayList(clientId, accessToken, x)
                        })
                        deffered.resolve(playlists);
                    }
                });
            });

            return deffered.promise;
        }

        this.addTrack = function(title, description, genre, stream) {
            var soundCloud = this;
            var deffered = Q.defer();
            token.then(function(accessToken) {
                deffered.resolve(Track.upload(accessToken, title, description, genre, stream));
            });
            return deffered.promise;
        }

    }

    return SoundCloud;
})