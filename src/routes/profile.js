const express = require("express");

const bcrypt = require("bcrypt");
// const validator = require("validator");
const { validateEditProfileData } = require("../utils/validation");
const userAuth = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;
		res.json({ message: "User fetched successfully!", data: loggedInUser });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
	try {
		if (!validateEditProfileData(req)) {
			throw new Error("Invalid edit request");
		}

		const loggedinUser = req.user;

		Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));

		await loggedinUser.save();

		res.json({
			message: `${loggedinUser.firstName}, your profile updated successfully.`,
			data: loggedinUser,
		});
	} catch (err) {
		res.status(400).send("ERROR: " + err.message);
	}
});

profileRouter.patch("/password", userAuth, async (req, res) => {
	try {
		//validate curr passwod
		const { currentPassword, newPassword } = req.body;
		const loggedinUser = req.user;
		const isCurrValidPassword = await bcrypt.compare(
			currentPassword,
			loggedinUser.password
		);
		if (!isCurrValidPassword) {
			throw new Error("Current Password is not valid.");
		}

		//update the pwd
		const passwordHash = await bcrypt.hash(newPassword, 10);
		loggedinUser.password = passwordHash;
		await loggedinUser.save();

		res.json({ message: "Password updated successfully" });
	} catch (err) {
		res.status(400).json({ ERROR: `${err.message}` });
	}
});

module.exports = profileRouter;
