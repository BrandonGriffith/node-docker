const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middleware/authMiddleware")
const router = express.Router();


router.route("/").get(postController.getAllPosts).post(auth, postController.createPost);
router.route("/:id").get(postController.getOnePost).patch(postController.updatePost).delete(postController.deletePost);


module.exports = router;