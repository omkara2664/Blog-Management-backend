const bcrypt = require("bcrypt");

module.exports.SALT = bcrypt.genSaltSync(5);
module.exports.JWT_SECRET = "This-is-Top-secret";