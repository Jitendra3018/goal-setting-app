const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc	Register New User
// @route	POST /api/users
// @access	Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all the fields");
	}

	// Check if the user already exist or not
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create the New User
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
		});
	} else {
		res.status(400);
		throw new Error("User not created");
	}

	// res.json({ message: "Registering user" });
});
// @desc	Authenticate User
// @route	POST /api/users/login
// @access	Public
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: "Logging user" });
});
// @desc	Get User data
// @route	GET /api/user/me
// @access	Public
const getMe = asyncHandler(async (req, res) => {
	res.json({ message: "Displaying user's information" });
});

module.exports = { registerUser, loginUser, getMe };
