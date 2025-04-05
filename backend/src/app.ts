import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', router);

//Router handle does not exist
app.use((_: Request, res: Response) => {
    res.status(404).json({ message: '404' });
});

export default app;