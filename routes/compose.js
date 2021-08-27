const router = require("express").Router();
const {Blog} = require("../models/Blog");
const authVerify = require("../helpers/authVerify");


router
  .get("/compose",authVerify, async(req, res) => {
   
    const userInfo =req.cookies;
           res.render("composeBlog",{token: userInfo.Username});
  })

  .post("/compose", (req, res) => {
    
    const { title, content } = req.body;
    // * check for the missing fields!
    if (!title || !content)
      return res.send("Please enter all the required credentials!");

    
    const userInfo =req.cookies;
   
    const newBlog = new Blog({ title, content, creator: userInfo.Username});

    // save the blog to the database
    newBlog
      .save()
      .then(() => {
        console.log("Blog Saved Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
   
});

module.exports = router;
