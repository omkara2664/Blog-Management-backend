const express = require("express");
const { blogsController } = require("../../controllers");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/auth.middlewares");



router.get("/", authMiddleware, blogsController.getAllBlogs);
router.get("/:id", authMiddleware, blogsController.getBlogById);
router.post("/", authMiddleware, blogsController.createBlogs);
router.put("/:id", authMiddleware, blogsController.updateBlog);
router.delete("/:id", authMiddleware, blogsController.deleteBlog);
router.get("/category/:category", authMiddleware, blogsController.getByCategory);

module.exports = router;