const blogModel = require("../models/blog.model");
const getBlogs = async (req, res) => {
    res.status(200).send("All blogs");
}

const getBlogById = async (req, res) => {
    res.status(200).send("All blogs by Id ");
}

const createBlogs = async (req, res) => {
    res.status(200).send("Blogs Created successfully");
}
const updateBlog = async (req, res) => {
    res.status(200).send("Blogs updated successfully");
}

const deleteBlog = async (req, res) => {
    res.status(200).send("Blogs Deleted successfully");
}

module.exports = {
    getBlogs,
    getBlogById,
    createBlogs,
    updateBlog,
    deleteBlog,
}