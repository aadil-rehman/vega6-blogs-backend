const express = require("express");
const cors = require("cors");
const mongoDBconnect = require("./config/database");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blogs");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const uploadRouter = require("./routes/upload");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/blog", blogRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/image", uploadRouter);
app.use("/profile", profileRouter);

mongoDBconnect()
	.then(() => {
		console.log("Database connection establised.");
		app.listen(process.env.PORT || 3000, () => {
			console.log(`Server listening on Port...`);
		});
	})
	.catch((err) => {
		console.error("Database cannot be connected", err.message);
	});
