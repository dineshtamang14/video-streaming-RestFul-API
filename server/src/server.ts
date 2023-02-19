import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs'
import morgan from "morgan"
import fileRoutes from './routes/file';
import chunkRoutes from './routes/chunk';
import segmentRoutes from './routes/segment';

const app = express();
const hostname = '0.0.0.0'
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(fileRoutes);
app.use(chunkRoutes);
app.use(segmentRoutes);

const PORT = 8000;
app.listen(PORT, hostname, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
