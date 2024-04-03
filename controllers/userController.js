const User = require('../models/models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email: email } });

            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });

            res.status(201).json({ message: 'User registered successfully', user: newUser });

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function for user login
    loginUser: async (req, res) => {
        try {
            // Extract email and password from request body
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

            // Respond with token
            res.status(200).json({ token: token });
        } catch (error) {
            console.error('Error in user login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function for fetching user profile
    getUserProfile: async (req, res) => {
        try {
            // Extract userId from request parameters
            const userId = req.params.userId;

            // Find user by userId
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Respond with user profile
            res.status(200).json({ user: user });
        } catch (error) {
            console.error('Error in fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function for updating user profile
    updateUserProfile: async (req, res) => {
        try {
            // Extract userId and updated profile details from request parameters and body
            const userId = req.params.userId;
            const updatedProfile = req.body;

            // Find user by userId and update profile
            const [updatedRows] = await User.update(updatedProfile, { where: { id: userId } });
            if (updatedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Respond with success message
            res.status(200).json({ message: 'User profile updated successfully' });
        } catch (error) {
            console.error('Error in updating user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = UserController;