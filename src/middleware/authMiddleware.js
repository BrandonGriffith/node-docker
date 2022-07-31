const auth = (req, res, next) => {
    if (!req.session.user) return res.status(400).json({result: "fail", message: "Not logged in"});
    req.user = req.session.user;
    next();
};
module.exports = auth;