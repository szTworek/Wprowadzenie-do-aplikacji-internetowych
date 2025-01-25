const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());

app.listen(3002, () => {
    console.log("Users service running on port 3002");
});

const { sequelize, User } = require('../database');

app.post('/api/register', async (req, res) => {
    try {
        const {email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'Account created', userId: user.id });
    } catch (err) {
        res.status(500).json({ error: 'Error creating account' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });


        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.status(401).json({ error: 'Invalid credentials' });


        const token = jwt.sign({ userId: user.id }, 'tokenKey', { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ error: 'Error logging in' });
    }
});
