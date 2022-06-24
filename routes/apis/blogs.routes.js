const express = require("express");
const { blogsController } = require("../../controllers");
const router = express.Router();


router.get("/", blogsController.getBlogs);
router.get("/:id", blogsController.getBlogById);
router.post("/", blogsController.createBlogs);
router.put("/:id", blogsController.updateBlog);
router.delete("/:id", blogsController.deleteBlog);

module.exports = router;