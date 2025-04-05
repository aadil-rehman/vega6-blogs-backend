const express = require("express");
const cors = require("cors");
const mongoDBconnect = require("./config/database");
const User = require("./modules/User");
require("dotenv").config();
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
			res.json({ message: "Login Successfull!", data: user });
		}
	} catch (err) {
		res.status(400).send("Error: " + err.message);
	}
});

mongoDBconnect()
	.then(() => {
		console.log("Database connection establised.");
		app.listen(PORT, () => {
			console.log(`Server listening on Port ${PORT}`);
		});
	})
	.catch(() => {
		console.log("Database cannot be connected");
	});
