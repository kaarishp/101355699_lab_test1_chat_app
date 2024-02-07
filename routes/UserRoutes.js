const express = require('express');
const router = express.Router();
const UserModel = require('../model/User');

//Route to get all users
//http://localhost:3000/users
router.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }
        // You may generate a token here and send it back to the client for authentication
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});

module.exports = router;