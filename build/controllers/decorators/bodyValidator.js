"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
function bodyValidator2() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    function func(validationKeys) {
        return function (req, res, next) {
            if (!req.body) {
                res.status(400).send("Invalid request");
                return;
            }
            for (var _i = 0, validationKeys_1 = validationKeys; _i < validationKeys_1.length; _i++) {
                var key = validationKeys_1[_i];
                if (!req.body[key]) {
                    res.status(422).send("Missing property " + key);
                    return;
                }
            }
            next();
        };
    }
    return function (target, key) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.VALIDATOR, func(keys), target, key);
    };
}
exports.bodyValidator2 = bodyValidator2;
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.VALIDATOR, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
