import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../lib/dbConnection.js';
import * as queries from '../lib/queries.js'

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const [rows] = await pool.query(queries.createUserQuery, [username, hashedPassword]);
        res.json({ success: true, user: { username } });
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