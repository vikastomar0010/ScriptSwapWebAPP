import express from 'express';
import * as dotenv from 'dotenv';
import routerf from './routes/File.routes.js'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' });
});

app.use('/api/v1/file',routerf)

const start = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server is live...!`);
        });
    } catch (error) {
        console.log('Error starting server:', error);
    }
};

start();
