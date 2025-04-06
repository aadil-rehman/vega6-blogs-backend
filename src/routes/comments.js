const express = require("express");
const userAuth = require("../middlewares/auth");
const Blog = require("../modules/blog");
const Comments = require("../modules/comments");

const commentsRouter = express.Router();

commentsRouter.post("/create/:blogId", userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;
		const fromUserId = loggedInUser._id;
		const blogId = req.params.blogId;

		const blog = await Blog.findById(blogId);
		const toUserId = blog.authorId;

		const message = req.body.message;

		const comment = new Comments({
			fromUserId,
			toUserId,
			blogId,
			message,
		});

		await comment.save();
		res.json({ message: "Comment added successfully!", comment });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = commentsRouter;
