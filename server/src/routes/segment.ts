import path from 'path';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/poster', (req: Request, res: Response) => {
    const resolvedPath = path.resolve('assets/selena.jpg');
    res.sendFile(resolvedPath);
});

/**
 * This route will return an .m3u8 file with all video file segments info
 * If you don't have any files in /segments folder -> run "generate.mjs" file:
 * it will create a m3u8 list with segmented videos.
 */
router.get('/segments', (req: Request, res: Response) => {
    const resolvedPath = path.resolve('assets/segments/output.m3u8');
    res.sendFile(resolvedPath);
});

/**
 * Will return specific video segment, like "file149.ts" from the /segments folder
 */
router.get('/segments/:segment', (req: Request, res: Response) => {
    const { segment } = req.params;
    const resolvedPath = path.resolve(`assets/segments/${segment}`);
    res.sendFile(resolvedPath);
});

export default router;
