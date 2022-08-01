const express = require("express");
const {auth, isUser} = require("../middleware/authMiddleware")
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").get(auth, userController.getAllUsers);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.route("/:id").get(auth, userController.getOneUser).patch(auth, isUser, userController.updateUser).delete(auth, isUser, userController.deleteUser);


module.exports = router;