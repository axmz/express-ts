"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var appRouter_1 = require("../../appRouter");
var router = appRouter_1.AppRouterSingleton.getInstance();
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (req, res) {
        res.send("\n        <form method=\"POST\">\n          <div>\n            <input name=\"email\" type=\"text\"></input>\n            <label>Email</label>\n          </div>\n          <div>\n            <input name=\"password\" type=\"password\"></input>\n            <label>Password</label>\n          </div>\n          <br/>\n          <button type=\"submit\">SUBMIT</button>\n        </form>\n      ");
    };
    LoginController.prototype.postLogin = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email && password && email === "em" && password === "pass") {
            req.session = { loggedIn: true };
            res.redirect('/');
        }
        else {
            res.send('Invalid email or pass');
        }
    };
    LoginController.prototype.getLogout = function (req, res) {
        req.session = undefined;
        res.redirect('/');
    };
    __decorate([
        get('/login')
    ], LoginController.prototype, "getLogin", null);
    LoginController = __decorate([
        controller('/auth')
    ], LoginController);
    return LoginController;
}());
