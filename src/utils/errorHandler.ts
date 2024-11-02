import { Request, Response } from 'express';
import { logError } from '../middlewares/middlewareLogger'; 

const handleError = (req: Request, res: Response, message: string, statusCode: number) => {

    logError(message);
    return res.status(statusCode).json({ success: false, message });
};

export { handleError };