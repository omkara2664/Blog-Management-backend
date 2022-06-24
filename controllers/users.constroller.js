const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
    isValid,
    isValidString,
    isValidObject,
    isValidEmail,
    SALT,
} = require("../utils");

const getAllUsers = async (req, res) => {
    const response = {
        success: true,
        code: 200,
        message: "User list",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    try {
        const users = await userModel.find({});
        response.data = { users };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
};

const createUser = async (req, res) => {
    const user = req.body;
    const response = {
        success: true,
        code: 200,
        message: "User Created Successfully",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    if (!isValid(user) && !isValidObject(user)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid requset data";
        return res.status(400).json(response);
    }
    if (!isValid(user.title) || (isValid(user.title) && !isValidString(user.title))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.title is reqired";
        response.error = "Invalid request data.title is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(user.name) || (isValid(user.name) && !isValidString(user.name))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Name is reqired";
        response.error = "Invalid request data.Name is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(user.email) || (isValid(user.email) && !isValidEmail(user.email))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Email is reqired";
        response.error = "Invalid request data.Email is reqired";
        return res.status(400).json(response);
    }
    if (
        !isValid(user.password) ||
        (isValid(user.password) && !isValidString(user.password))
    ) {
        console.log("in pass")
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Password is reqired";
        response.error = "Invalid request data. Password is reqired";
        return res.status(400).json(response);
    }
    const arrTitle = ['Mr', 'Ms', 'Miss'];

    try {
        const isTitleExist = arrTitle.indexOf(user.title);
        if (isTitleExist === -1) {
            response.success = false;
            response.code = 400;
            response.message = `Enter valid title, '${user.title}' is not valid.`;
            response.error = "Invalid request title";
            return res.status(400).json(response);
        }
    } catch (error) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request title";
        response.error = "Invalid request title";
        return res.status(400).json(response);
    }
    try {
        const isEmailExist = await userModel.findOne({
            email: user.email,
        });
        if (isEmailExist)
            throw new Error(`This email ${user.email} id is already registered.`)

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
    const hashPassword = await bcrypt.hash(user.password.trim(), SALT);
    const cleanedUserData = {
        title: user.title.trim(),
        name: user.name.trim(),
        email: user.email.trim(),
        password: hashPassword,
    }
    try {
        const newUser = new userModel(cleanedUserData);
        await newUser.save();
        response.data = { user: newUser };
        return res.status(201).json(response);
    } catch (error) {
        response.error = error;
        response.code = error.code ? error.code : 500;
        response.message = "Failed to create new user. ";
        return res.status(500).json(response);
    }
};


module.exports = {
    getAllUsers,
    createUser,
};