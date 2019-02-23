const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
    comment:String,
    sender:String,
    slug_title:String
});

const commentModels = mongoose.model("comment", comment);

module.exports = commentModels;