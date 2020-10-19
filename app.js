//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "This blog is all about recent advancement in technology and trending technology. Here you will get tech tips on use of software tools, articles about web development, data science, AI etc... As this is a new initiative your feedbacks are most welcome.";
const aboutContent = "Learning Point is a free of cost initiative on providing educational content free of cost to the needy people. Here you will find insightful articles about Data science, Web development and other tech tips. This site is Managed and hosted by Shivam Saway, If you want to ask anything please mail me on my email id. You can also connect to me via LinkedIn";
const contactContent = "If you have any feedback or suggestion for this website then you are most welcome. Feel Free to contact me on this mail Id : shivamsaway123@gmail.com or connect with me via LinkedIn. You can view my profile through the footer section.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.Title,
    content: req.body.Content
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
