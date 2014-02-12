define(['underscore', 'q', 'form-data', 'request', 'paths'], function(_, Q, FormData, request, path) {
    function Track(accessToken, json) {
        _.extend(this, json);

        this.addTrack = function(title, description, genre, trackStream) {

        }

    }

    Track.upload = function(accessToken, title, description, genre, stream) {
        var deffered = Q.defer();
        var form = new FormData();
        form.append('track[title]', title);
        form.append('track[description]', description);
        form.append('track[genre]', genre);
        form.append('oauth_token', accessToken);
        form.append('track[asset_data]', stream());
        form.submit(path('add_track'), function(err, response) {
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
        return deffered.promise;
    }

    return Track;
});