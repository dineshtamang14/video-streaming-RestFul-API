import express, { Request, Response } from 'express';
import path from 'path';
import { VIDEO_FILE_PATH } from '../constants';

const router = express.Router();

/**
 * Send a simple video file
 */
router.get('/video-file', (req: Request, res: Response) => {
    const resolvedPath = path.resolve(VIDEO_FILE_PATH);
    res.sendFile(resolvedPath);
});

export default router;
