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
        await pool.query(queries.createUserQuery, [username, hashedPassword]);
        res.json({ success: true, user: { username } });
    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }
        const user = await pool.query(queries.findUserByUsernameQuery, [username]);
        if (!user) return res.status(403).send('User not found');
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(403).send('Wrong password');
        handleVerifiedUsers(username);
        res.send('verified');
    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

router.post('/decode_message', async (req, res) => {
    try {
        const { username, message } = req.body;
        if (!username || !message) {
            return res.status(400).json({ error: 'Username and message are required.' });
        }
        if (!verifiedUsers[username]) {
            return res.status(403).json({ error: 'User not verified.' });
        }

        let isAscending = true;
        for (let i = 0; i < message.length - 1; i++) {
            if (message[i] >= message[i + 1]) {
                isAscending = false;
                break;
            }
        }

        if (isAscending) {
            let sum = 0;
            for (let i = 0; i < message.length; i++) {
                sum += message[i];
            }
            res.json({ status: 'Legit', sum: sum });
        } else {
            res.json({ status: 'Trap', result: -1 });
        }

    } catch (err) {
        res.status(err.status || 500).send(err.message || 'Server internal error');
    }
});

const verifiedUsers = {};

function handleVerifiedUsers(username) {
    verifiedUsers[username] = true;
}

export default router;