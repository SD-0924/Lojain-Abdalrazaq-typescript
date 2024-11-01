import { Request, Response, NextFunction } from 'express';

// middleware to log the request
export const logger = (req: Request, res: Response, next: NextFunction) => {

    // log the data, method and url
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // call the next middleware
    next();

};

// fucntion to log errors
export const logError = (message: string) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
};
