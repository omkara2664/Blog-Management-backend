const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
    console.log("All users");
    res.send("All users");
}

const createUser = async (req, res) => {
    res.status(200).send("User created successfully");

}


module.exports = {
    getAllUsers,
    createUser,
};