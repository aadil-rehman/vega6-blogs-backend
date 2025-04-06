const express = require("express");
const Blog = require("../modules/blog");
const userAuth = require("../middlewares/auth");

const blogRouter = express.Router();

blogRouter.post("/create", userAuth, async (req, res) => {
	try {
		const { blogTitle, blogDescription, blogImage } = req.body;

		const blog = new Blog({
			blogTitle,
			blogDescription,
			blogImage,
			authorId: req.user._id,
		});

		await blog.save();

		res.json({ message: "Blog created successfully!", data: blog });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

blogRouter.get("/list", userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;
		const blogs = await Blog.find({ authorId: loggedInUser._id });

		res.json({ message: "Blogs fecthed successfully!", data: blogs });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

blogRouter.patch("/edit", userAuth, async (req, res) => {
	try {
		const blogId = req.body._id;

		const blog = await Blog.findById(blogId);

		if (!blog) {
			throw new Error("Blog not present");
		}

		Object.keys(req.body).forEach((key) => (blog[key] = req.body[key]));

		await blog.save();

		res.json({ message: "Blog updated successfully!", blog });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

blogRouter.delete("/delete/:id", userAuth, async (req, res) => {
	try {
		const blogId = req.params.id;
		const loggedInUser = req.user;
		const blog = await Blog.findById(blogId);

		if (!blog) {
			return res.status(404).json({ error: "Blog not found" });
		}
		if (blog.authorId.toString() !== loggedInUser._id.toString()) {
			return res
				.status(403)
				.json({ error: "Unaithorized to delete this blog" });
		}

		await Blog.findByIdAndDelete(blogId);
		res.json({ message: "Blog deleted successfully!" });
	} catch (err) {
		res.status(400).json({ Error: err.message });
	}
});

module.exports = blogRouter;
