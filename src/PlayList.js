define(['underscore', 'q', 'form-data', 'request', 'Track'], function(_, Q, FormData, request, Track) {
    function PlayList(accessToken, json) {
        _.extend(this, json);

        this.addTrack = function(title, description, genre, trackStream) {

        }

    }
    return PlayList;
});