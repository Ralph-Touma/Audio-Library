const User = require('./user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UserController {
    async signup(req, res, next) {
        try {
            const { name, email, password, dateOfBirth, location } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                registrationDate: new Date(),
                dateOfBirth,
                location
            });

            await newUser.save();
            res.status(201).json({ message: 'User created successfully', userId: newUser._id });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token, userId: user._id });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
