import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../lib/dbConnection.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { username, password } = req.body;
    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

router.post('/decode_message', async (req, res) => {
    try {
        const { username, message } = req.body;
    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

export default router;