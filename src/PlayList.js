define(['underscore', 'q', 'form-data', 'request', 'Track', 'url'], function(_, Q, FormData, request, Track, URL) {
    function PlayList(clientId, accessToken, json) {
        var playlist = this;

        _.extend(playlist, json);

        playlist.trackIds = function() {
            return _.map(json.tracks, function(track) {
                return track.id;
            })
        }

        playlist.parsedUrl = function() {
            var playListUri = URL.parse(playlist.uri);
            return {
                method: 'put',
                host: playListUri.host,
                path: playListUri.path,
                protocol: playListUri.protocol
            };
        }

        playlist.tracks = function() {
            console.log('fetching tracks for playlist : ' + playlist.title);
            var deffered = Q.defer();
            var uri = playlist.uri + '?client_id=' + clientId + '&format=json';
            request(uri, function(err, response, body) {
                if (!err) {
                    var tracks = _.map(JSON.parse(body).tracks, function(track) {
                        return new Track(accessToken, track);
                    })
                    deffered.resolve(tracks);
                }
            });
            return deffered.promise;
        }


        playlist.addTrack = function(track) {
            console.log('adding track to playlist...');
            var deffered = Q.defer();
            var form = new FormData();
            form.append('format', 'json');
            _.each(playlist.trackIds(), function(id) {
                form.append('playlist[tracks][][id]', id);
            });
            form.append('playlist[tracks][][id]', track.id);
            form.append('oauth_token', accessToken);
            form.submit(playlist.parsedUrl(), function(err, response) {
                if (!err) {
                    console.log('Track added to playlist!');
                    response.on('data', function(chunk) {
                        deffered.resolve(chunk.toString('utf8'));
                    });
                } else {
                    console.log(err);
                    deffered.reject('Error while adding track to the play list');
                }
            });
            return deffered.promise;
        }

    }
    return PlayList;
});