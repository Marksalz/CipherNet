import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use('/users', userRoutes);

await connectToDB();

const startServer = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT} to see the app`)
        });
    } catch (error) {
        console.log('Failed to connect to the database:', error.message);
        process.exit(1);
    }
};

startServer();
