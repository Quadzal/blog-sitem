const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const members = new Schema({
    username:String,
    password:String,
    email:String
});

const membersModel = mongoose.model("members", members);

module.exports = membersModel;