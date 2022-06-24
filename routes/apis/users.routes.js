const express = require("express");

const { usersController } = require("../../controllers");

const router = express.Router();

router.get("/", usersController.getAllUsers);

module.exports = router;