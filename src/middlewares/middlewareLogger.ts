import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    // log the request to the console
    // The data, method, and URL of the request are logged
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);


    // call the next middleware function in the stack
    next();
};
