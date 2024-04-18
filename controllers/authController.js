const authController = require('express').Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

authController.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required fields");
        }

        const isExisting = await User.findOne({ email });

        if (isExisting) {
            throw new Error("An account with this email already exists. Please use a different email.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ ...req.body, password: hashedPassword });

        const { password: _, ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, "satyasingh", { expiresIn: '5h' });
        return res.status(201).json({ user: others, token, isAdmin: newUser.isAdmin });
        // return res.status(201).json({ user: others, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});





authController.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password);

        if (!comparePass) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, "satyasingh", { expiresIn: '24h' });


        const { password, ...userWithoutPassword } = user._doc;

        return res.status(200).json({ user: userWithoutPassword, token,isAdmin: user.isAdmin });
        // return res.status(200).json({ user: others, token, isAdmin: user.isAdmin });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:error });
    }
});

module.exports = authController