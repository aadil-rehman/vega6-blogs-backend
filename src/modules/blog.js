const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		blogTitle: {
			type: String,
			required: true,
			maxLength: 100,
		},
		blogDescription: {
			type: String,
			required: true,
			maxLength: 1000,
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
