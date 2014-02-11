"use strict";
global.sinon = require("sinon");
global._ = require("underscore");
global.chai = require("chai");
global.chai.use(require("chai-as-promised"));
global.should = require("chai").should();
global.expect = require("chai").expect;
global.assert = require("chai").assert;
global.AssertionError = require("chai").AssertionError;

global.swallow = function(thrower) {
    try {
        thrower();
    } catch (e) {}
};

var sinonChai = require("sinon-chai");
chai.use(sinonChai);