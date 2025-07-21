import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT} to see the app`)
        });
    } catch (error) {
        console.log('Failed to connect to the database:', error.message);
        process.exit(1);
    }
};

startServer();