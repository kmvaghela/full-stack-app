const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        img: { type: String, required: true },
        category: { type: String, required: true },
        contributor: { type: String, required: true },
        downloads:{type: Number,required: false},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);