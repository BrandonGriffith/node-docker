const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUsers);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.route("/:id").get(userController.getOneUser).patch(userController.updateUser).delete(userController.deleteUser);


module.exports = router;