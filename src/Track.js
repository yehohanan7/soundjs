define(['underscore', 'q', 'form-data', 'request', 'paths', 'url'], function(_, Q, FormData, request, path, URL) {
    function Track(accessToken, json) {
        var track = this;
        _.extend(this, json);

        function updateOptions() {
            var trackUri = URL.parse(track.uri);
            return {
                method: 'put',
                host: trackUri.host,
                path: trackUri.path,
                protocol: trackUri.protocol
            };
        }

        track.updateReleaseDate = function(date) {
            console.log('updating track...' + track['uri']);
            var dateArray = date.split('/');
            var deffered = Q.defer();
            var form = new FormData();
            form.append('format', 'json');
            form.append('release_date', dateArray[0]);
            form.append('release_month', dateArray[1]);
            form.append('release_year', dateArray[2]);
            form.append('oauth_token', accessToken);
            form.submit(updateOptions(), function(err, response) {
                if (!err) {
                    deffered.resolve(track);
                } else {
                    deffered.reject();
                }
            })
            return deffered.promise;
        }

    }

    Track.upload = function(accessToken, title, description, genre, stream) {
        console.log('uploading track...');
        var deffered = Q.defer();
        var form = new FormData();
        form.append('format', 'json');
        form.append('track[title]', title);
        form.append('track[description]', description);
        form.append('track[genre]', genre);
        form.append('oauth_token', accessToken);
        form.append('track[asset_data]', stream());
        form.submit(path('add_track'), function(err, response) {
            if (!err) {
                console.log('upload successful');
                response.on('data', function(chunk) {
                    deffered.resolve(new Track(accessToken, JSON.parse(chunk.toString('utf8'))));
                });
            } else {
                console.log(err);
                deffered.reject('Error while uploading track');
            }
        });
        return deffered.promise;
    }



    return Track;
});