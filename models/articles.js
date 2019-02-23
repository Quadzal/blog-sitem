const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const articles = new Schema({
    title:{type:String,unique:true},
    content:{type:String,unique:true},
    author:{type:String,unique:false},
    slug_title:{type:String,unique:true},
    total_views:{type:Number,default:0}
});

const articlesModels = mongoose.model("articles", articles);

module.exports = articlesModels;