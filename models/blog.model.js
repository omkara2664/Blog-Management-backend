const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    tags: [String],
    createdAt: { type: Date, defalut: new Date() },
    modifiedAt: { type: Date, defalut: new Date() },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
},
    { timestamps: true },
)

module.exports = mongoose.model("Blogs", blogsSchema);