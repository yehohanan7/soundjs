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
    return context;
}

module.exports = {
    context: function(map) {
        return createContext(map);
    }
}