const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const dbconnect = mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true },(err) => {
    if(err) throw err;
    
});

module.exports = dbconnect;