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
exports.getAllUsers = async (_req, res) => {
    try { 
        const users = await User.find();
        res.status(200).json({
            result: "success",
            results: users.length,
            data: {
                users,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.getOneUser = async (req, res) => {
    try { 
        const user = await User.findById(req.params.id);
        res.status(200).json({
            result: "success",
            data: {
                user,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.updateUser = async (req, res) => {
    try {
        if (req.body["password"]){
            req.body["password"] = await bcrypt.hash(req.body["password"], 12);
        };
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            result: "success",
            data: {
                user,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.deleteUser = async (req, res) => {
    try { 
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: "success",
            data: null,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};