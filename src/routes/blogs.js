const express = require("express");
const Blog = require("../modules/blog");
const userAuth = require("../middlewares/auth");

const blogRouter = express.Router();

blogRouter.post("/create", userAuth, async (req, res) => {
	try {
		const { blogTitle, blogDescription, blogImage } = req.body;

		const blog = new Blog({ blogTitle, blogDescription, blogImage });

		await blog.save();

		res.json({ message: "Blog created successfully!" });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

blogRouter.get("/list", userAuth, async (req, res) => {
	try {
		const blogs = await Blog.find();

		res.json({ message: "Blogs fecthed successfully!", data: blogs });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

blogRouter.patch("/edit", userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;

		res.json({ message: "Blog updated successfully!", data: blogs });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

module.exports = blogRouter;
