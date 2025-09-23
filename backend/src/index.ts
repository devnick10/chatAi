import cors from 'cors';
import express from "express";
import { PORT } from "./config";
import aiRouter from './routes/ai';
import authRouter from './routes/auth';
const app = express();
app.use(express.json());
app.use(cors())

app.use('api/v1/ai', aiRouter);
app.use('api/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT || ${PORT}`)
})