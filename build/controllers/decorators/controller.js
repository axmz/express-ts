"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
var appRouter_1 = require("../../appRouter");
// function bodyValidator(validationKeys: string[]): RequestHandler {
//   return function(req: Request, res: Response, next: NextFunction) {
//     if (!req.body) {
//       res.status(400).send("Invalid request");
//       return;
//     }
//     for (let key of validationKeys) {
//       if (!req.body[key]) {
//         res.status(422).send(`Missing property ${key}`);
//         return;
//       }
//     }
//     next();
//   };
// }
function controller(routePrefix) {
    return function (target) {
        var router = appRouter_1.AppRouterSingleton.getInstance();
        for (var key in target.prototype) {
            var handler = target.prototype[key];
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target.prototype, key) ||
                [];
            var validator = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.VALIDATOR, target.prototype, key) ||
                [];
            // const requiredBodyProps =
            //   Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
            //   [];
            // const validator = bodyValidator(requiredBodyProps);
            if (path) {
                router[method](routePrefix + path, __spreadArrays(middlewares), validator, handler);
            }
        }
    };
}
exports.controller = controller;
