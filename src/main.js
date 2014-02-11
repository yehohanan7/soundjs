var config = require('./config');
var requirejs = config.context();

console.log(requirejs('sound'));