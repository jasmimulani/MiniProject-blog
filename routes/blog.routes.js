const express = require('express');
const { showBlog, addBlog } = require('../controller/blog.controller');
const blogRoutes = express.Router();
const { verifyToken }  = require('../helpers/verifyToken')

blogRoutes.get("/",verifyToken,showBlog);
blogRoutes.post("/",verifyToken,addBlog);


module.exports = blogRoutes;