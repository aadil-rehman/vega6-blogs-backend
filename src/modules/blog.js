const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		blogTitle: {
			type: String,
			required: true,
		},
		blogDescription: {
			type: String,
			required: true,
		},
		blogImage: {
			public_id: String,
			url: String,
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
