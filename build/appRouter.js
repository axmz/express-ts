"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AppRouterSingleton = /** @class */ (function () {
    function AppRouterSingleton() {
    }
    AppRouterSingleton.getInstance = function () {
        if (!AppRouterSingleton.instance) {
            AppRouterSingleton.instance = express_1.Router();
        }
        return AppRouterSingleton.instance;
    };
    return AppRouterSingleton;
}());
exports.AppRouterSingleton = AppRouterSingleton;
