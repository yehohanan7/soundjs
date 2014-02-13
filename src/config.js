var requirejs = require('requirejs');
var _ = require('underscore');

function createContext(stubs) {
    var map = {};
    _.each(stubs, function(value, key) {
        map[key] = "stub_" + key;
    });

    var context = requirejs.config({
        baseUrl: __dirname,
        nodeRequire: require,
        map: {
            "*": map
        }
    });

    _.each(stubs, function(value, key) {
        requirejs.define('stub_' + key, function() {
            return value;
        })
    })

    requirejs.define('paths', ['underscore'], function(_) {
        return function path(name, options) {
            var api = 'https://api.soundcloud.com';

            var paths = {
                playlists: '/me/playlists',
                access_token: '/oauth2/token',
                add_track: '/tracks'
            };

            var params = _.extend({
                'format': 'json'
            }, options || {});

            var queryParams = _.map(_.pairs(params), function(pair) {
                return pair.join('=');
            });
            console.log(api + paths[name] + '?' + queryParams.join('&'));
            return api + paths[name] + '?' + queryParams.join('&');
        }
    });

    return context;
}

module.exports = {
    context: function(map) {
        return createContext(map);
    }
}