const express = require("express");
const router = express.Router();

const userRouter = require("./users.routes");
const registerRouter = require("./routes.register");
const authsRouter = require("./auth.routes");
const blogsRouter = require("./blogs.routes");

router.use("/auth", userRouter);
router.use("/auth/login", authsRouter);
router.use("/auth/register", registerRouter)

router.use("/blogs", blogsRouter);





module.exports = router;