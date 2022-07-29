const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "all posts need a title"],
    },
    body: {
        type: String,
        require: [true, "post must have content"],
    },
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;