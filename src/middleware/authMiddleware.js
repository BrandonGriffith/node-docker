const User = require("../models/userModel");


exports.auth = (req, res, next) => {
    if (!req.session.user) return res.status(400).json({result: "fail", message: "Not logged in"});
    req.user = req.session.user;
    next();
};
exports.isUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (req.user.username != user.username && req.user.username != "admin") return res.status(400).json({result: "fail", message: "Wrong user"});
    if (req.user.username != "admin") req.user.username = req.body.username;
    next();
};