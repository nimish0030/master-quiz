const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken");


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // No need to hash password here as it's handled in the User model pre-save hook
        const user = new User({ name, email, password });
        await user.save();
        
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        res.status(500).json({ error: "Registration failed", details: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.status(200).json({ 
            token, 
            user: { 
                id: user._id,
                name: user.name, 
                email: user.email 
            } 
        });

    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err.message });
    }
};