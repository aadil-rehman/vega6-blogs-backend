const express = require("express");
const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
	try {
		const { firstName, lastName, emailId, profileImage } = req.body;
		const inputPassword = req.body.password;
		const passwordHash = await bcrypt.hash(inputPassword, 10);
		console.log(passwordHash);
		const user = new User({
			firstName,
			lastName,
			emailId,
			password: passwordHash,
			profileImage,
		});
		await user.save();
		res.send("User added successfully");
	} catch (err) {
		res.status(400).send("Error in savibg the user:" + err.message);
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const { emailId, password } = req.body;

		//check if the user with the provided mail id is present or not
		const user = await User.findOne({ emailId: emailId });
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const passwordHash = user.password;
		const isPasswordValid = bcrypt.compare(password, passwordHash);

		if (isPasswordValid) {
			//create jwt token
			const token = await jwt.sign({ _id: user._id }, "vega6Blogs@Aadil@123"); //jwt.sign(payload, secret_key)

			//add token to cookie
			res.cookie("token", token, {
				expires: new Date(Date.now() + 12 * 3600000),
			});

			res.json({ message: "Login Successfull!", data: user });
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		res.status(400).send("Error: " + err.message);
	}
});

module.exports = authRouter;
