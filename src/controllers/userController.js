const User = require("../models/userModel");

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({
            result: "success",
            data: {
                user: newUser,
            },
        })
    }
    catch (e) { res.status(400).json({result:"fail", error:e}) };
};