const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


exports.signUp = async (req, res) => {
    try {
        if (req.body["password"]){
            req.body["password"] = await bcrypt.hash(req.body["password"], 12);
        }
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