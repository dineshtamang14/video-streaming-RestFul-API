import { getChunkProps, getFileSizeAndResolvedPath } from '../utils';
import fs from 'fs';
import express, { Request, Response } from 'express';
import { VIDEO_FILE_PATH } from '../constants';

const router = express.Router();

/**
 * Send video file in chunks
 * Common approach
 */
router.get('/video', (req: Request, res: Response) => {
    const { fileSize, resolvedPath } = getFileSizeAndResolvedPath(VIDEO_FILE_PATH);

    const requestRangeHeader = req.headers.range;

    if (!requestRangeHeader) {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });
        // .pipe -> in a simple words it's like response.send() but for readStream
        fs.createReadStream(resolvedPath).pipe(res);
    } else {
        const { start, end, chunkSize } = getChunkProps(requestRangeHeader, fileSize);

        // Read only part of the file from "start" to "end"
        const readStream = fs.createReadStream(resolvedPath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        });
        readStream.pipe(res);
    }
});

export default router;
