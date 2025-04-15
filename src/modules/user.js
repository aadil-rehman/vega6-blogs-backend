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
			url: {
				type: String,
				default:
					"https://www.inklar.com/wp-content/uploads/2020/05/dummy_user-370x300-1.png",
			},
		},
		age: {
			type: Number,
			min: 5,
			max: 100,
		},
		gender: {
			type: String,
			validate(value) {
				if (!["male", "female", "other"].includes(value)) {
					throw new Error("Gender data is not valid");
				}
			},
		},
	},
	{ timestamps: true }
);

User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
