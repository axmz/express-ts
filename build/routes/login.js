"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403).send('Forbidden');
    }
}
var router = express_1.Router();
exports.router = router;
router.get("/login", function (req, res) {
    res.send("\n  <form method=\"POST\">\n    <div>\n      <input name=\"email\" type=\"text\"></input>\n      <label>Email</label>\n    </div>\n    <div>\n      <input name=\"password\" type=\"password\"></input>\n      <label>Password</label>\n    </div>\n    <br/>\n    <button type=\"submit\">SUBMIT</button>\n  </form>\n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "em" && password === "pass") {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or pass');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>Access Granted</div>\n      <br>\n      <a href=\"/logout\">Logout</a>\n    ");
    }
    else {
        res.send("\n      <div>Pls login</div>\n      <br>\n      <a href=\"/login\">Login</a>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route');
});
