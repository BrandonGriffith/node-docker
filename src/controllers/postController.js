const Post = require("../models/postModel");

exports.getAllPosts = async (_req, res) => {
    try { 
        const posts = await Post.find();
        res.status(200).json({
            results: posts.length,
            data: {
                posts,
            },
        });
    }
    catch (e) { console.log(e) };
};