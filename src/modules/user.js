const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		emailId: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email address: " + value);
				}
			},
		},
		password: {
			type: String,
			required: true,
		},
		profileImage: {
			public_id: String,
			url: String,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
