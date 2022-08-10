const blogsModel = require("../models/blog.model");


const {
    isValid,
    isValidString,
    isValidObject,

} = require("../utils");


const getAllBlogs = async (req, res) => {
    const response = {
        success: true,
        code: 200,
        message: "Blog List",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    try {
        const blogs = await blogsModel.find({
            isDeleted: false,
            userId: res.locals.userId,
        });
        // console.log(typeof blogs);
        if (blogs.length === 0) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "User Dosent Created any Blogs till now.",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }
        response.data = { blogs };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    };
}

const getByCategory = async (req, res) => {
    const category = req.params.category;
    // console.log(category);
    const blogs = await blogsModel.find({ userId: res.locals.userId, category: category, isDeleted: false })
    if (blogs.length === 0) {
        return res.status(403).json({
            success: false,
            code: 403,
            message: "Category is not exist",
            data: null,
            error: null,
            resource: req.originalUrl,
        });
    }
    return res.status(200).json({
        success: true,
        code: 200,
        message: "Blogs list based on category for authenticate owner.",
        data: { blogs },
        error: null,
        resource: req.originalUrl,
    })

}

const getBlogById = async (req, res) => {
    const blogId = req.params.id;
    // console.log(blogId);
    const response = {
        success: true,
        code: 200,
        message: "Blog list",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    try {
        const blog = await blogsModel.findOne({ _id: blogId });
        console.log(blog);
        if (!blog) throw new Error("Blog does not exist");
        response.data = { blog };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
};
const createBlogs = async (req, res) => {
    const blogs = req.body
    // console.log(blogs);
    const response = {
        success: true,
        code: 200,
        message: "Blog Created Succesfully",
        error: null,
        data: null,
        resourse: req.originalUrl,
    }
    console.log(isValidObject(blogs));
    if (!isValid(blogs) && !isValidObject(blogs)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid requset data";
        return res.status(400).json(response);
    }
    try {
        const isBlogstitleExist = await blogsModel.findOne({ title: blogs.title });
        if (isBlogstitleExist)
            throw new Error(`${blogs.title} blog already exist you can update it !`)
    } catch (error) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: error.message,
            error: error,
            data: null,
            resourse: req.originalUrl,
        })
    }
    if (!isValid(blogs.title) || (isValid(blogs.title) && !isValidString(blogs.title))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. Blog title is reqired";
        response.error = "Invalid request data. Blog title is reqired";
        return res.status(400).json(response);
    }
    try {
        const newBlog = await blogsModel.create({
            userId: res.locals.userId,
            title: blogs.title.trim(),
            description: blogs.description,
            category: blogs.category,
            // tags: blogs.tags,s
            // isDeleted: false,
        });
        console.log("hello");
        response.data = { blogs: newBlog };
        return res.status(201).json(response);
    } catch (error) {
        response.error = error;
        response.code = error.code ? error.code : 500;
        response.message = "Failed to create new blogs";
        return res.status(500).json(response);
    }
}
const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    // console.log(blogId);
    const blogData = req.body;
    if (!blogData || (isValid(blogData) && !isValidObject(blogData))) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty request body, nothing to update.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }
    if (!isValid(blogData.title) || isValid(blogData.title) && !isValidString(blogData.title)) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty Blog title, not allowed.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }
    if (!isValid(blogData.description) || isValid(blogData.description) && !isValidString(blogData.description)) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty Blog description, not allowed.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }
    if (!isValid(blogData.category) || isValid(blogData.category) && !isValidString(blogData.category)) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty Blog Category, not allowed.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }
    try {
        const isBlogExist = await blogsModel.findOne({ _id: blogId, isDeleted: false });
        if (!isBlogExist)
            return res.status(400).json({
                success: false,
                code: 404,
                message: "Invalid request Blog item not exist.",
                error: null,
                data: null,
                resource: req.originalUrl,
            });
        if (isBlogExist.userId.toString() !== res.locals.userId) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Unauthorise user, user not owner",
                data: null,
                error: null,
                resource: req.originalUrl,
            })
        }
        const updatedBlog = await blogsModel.findByIdAndUpdate(
            blogId,
            { $set: blogData },
            { new: true }   //// findByIdAndUpdate is take three parameter('where to update', 'updated data', 'if you want to show updated data( make true)')
        );
        await updatedBlog.save();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Blog updated successfully",
            error: null,
            data: { blog: updatedBlog },
            resource: req.originalUrl,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: error.message,
            error: error,
            data: null,
            resource: req.originalUrl,
        });
    }
}

const deleteBlog = async (req, res) => {
    const blogId = req.params;
    console.log(blogId.id);
    try {
        const isBlogExist = await blogsModel.findOne({ _id: blogId.id, isDeleted: false });
        // console.log(isBlogExist);
        if (!isBlogExist)
            throw new Error("Invalid Blog id. Blog does not exist with this id.");
        if (isBlogExist.userId.toString() !== res.locals.userId) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Unauthorise user, user not owner",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }
        isBlogExist.isDeleted = true,
            isBlogExist.deletedAt = new Date().toISOString();
        await isBlogExist.save();

        return res.status(200).json({
            success: true,
            code: 200,
            message: "Blog deleted successfully",
            error: null,
            data: { blog: isBlogExist },
            resource: req.originalUrl,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: error.message,
            error: error,
            data: null,
            resource: req.originalUrl,
        });
    }
}

module.exports = {
    getAllBlogs,
    createBlogs,
    updateBlog,
    deleteBlog,
    getByCategory,
    getBlogById,
}