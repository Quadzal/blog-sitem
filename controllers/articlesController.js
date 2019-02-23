const express = require("express");
const route = express.Router();
const articleModels = require("../models/articles");
const commentModels = require("../models/comments");
const slugify = require("slugify");

const POST_articleAdd = (request, response) => {
    let files = request.files.image;
    
    let article = new articleModels({
        title:request.body.header,
        content:request.body.content,
        author:request.body.author,
        slug_title:slugify(request.body.header),
        total_views:0
    });
    
    article.save((err) => {
        if(err){
             response.send("Böyle Bir Makale Zaten Var...")
                console.log(err);
            }
        else{
            files.mv("./public/uploads/" + article.title + ".png",(err)=> {
                    if (err) throw err;
                    
            });
            response.render("addArticles");
        }
    });
}

const GET_articleAdd = (request, response) => {
    response.render("addArticles");
}


const GET_home = (request, response) => {
    articleModels.find({},(err, articles) => {
        
        if(articles) response.render("home",{articles:articles});
        else response.send("404");
        
    })
}

const GET_articlePost = (request, response) => {
    
    
    articleModels.findOne({slug_title:request.params.articles_title}, (err, article) => {
        if(article){
            const _total_views = article.total_views + 1
            console.log(_total_views);
            articleModels.findOneAndUpdate({"slug_title":article.slug_title}, {"total_views":_total_views});
            commentModels.find({"slug_title":article.slug_title},(err,comments) => {
                if(comments) response.render("articles",{article:article,comments:comments});
                else response.render("articles",{article:article});
                
            })
        }
        else{
            response.send("404")
        }
    })
    
}


const GET_searchPosts = (request, response) => {
    articleModels.findOne({title:request.query.findPosts},(err, post)=>{

        if(post) response.render("home",{articles:[post]});
        else response.send("404");
    });
}

const commentAdd = (request, response) => {
    const comment = new commentModels({
        comment:request.body.comment,
        sender:request.body.comment_sender,
        slug_title:request.body.slug_title
    });
    comment.save();
    response.redirect("/blog/" + request.body.slug_title);
}

route.get("/", GET_home);
route.get("/search", GET_searchPosts);
route.get("/:articles_title", GET_articlePost);
route.get("/article/add", GET_articleAdd);
route.post("/addComment", commentAdd);
route.post("/article/add", POST_articleAdd);
module.exports = route;