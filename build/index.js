"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var appRouter_1 = require("./appRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
var app = express_1.default();
app.use(express_1.default.urlencoded()); //Parse URL-encoded bodies
app.use(cookie_session_1.default({ keys: ['keys'] }));
app.use(appRouter_1.AppRouterSingleton.getInstance());
app.listen(3000, function () { return console.log('Listening'); });
