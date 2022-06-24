const express = require("express");
const { blogsController } = require("../../controllers");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/auth.middlewares");



router.get("/", authMiddleware, blogsController.getAllBlogs);
router.get("/:category", authMiddleware, blogsController.getByCategory);
router.post("/", authMiddleware, blogsController.createBlogs);
router.put("/:id", authMiddleware, blogsController.updateBlog);
router.delete("/:id", authMiddleware, blogsController.deleteBlog);

module.exports = router;