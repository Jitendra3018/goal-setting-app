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
			// password: user.password,
			token: generateToken(user._id),
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
	const { email, password } = req.body;

	// Check for the User's Email
	const user = await User.findOne({ email });

	// Checking the password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Email or Password");
	}

	// res.json({ message: "Logging user" });
});

// @desc	Get User data
// @route	GET /api/user/me
// @access	Private
const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json(req.user);

	// res.json({ message: "Displaying user's information" });
});

// Generate the new Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { registerUser, loginUser, getMe };
