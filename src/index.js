const express = require("express");
const cors = require("cors");
const mongoDBconnect = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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
