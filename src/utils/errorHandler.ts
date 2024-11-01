import { Request, Response } from 'express';
import { logError } from '../middlewares/middlewareLogger'; 

const handleError = (req: Request, res: Response, message: string, statusCode: number) => {

    // use the logError middleware to log the error
    logError(message);
    // Send the error response to the user as JSON
    return res.status(statusCode).json({ success: false, message });
};

// export the function
export { handleError };