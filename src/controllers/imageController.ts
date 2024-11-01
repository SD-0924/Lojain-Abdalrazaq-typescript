import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler';

// upload an image
const uploadImage = (req: Request, res: Response): any => {

    // checking if the file is existing in the request
    if (!req.file) {
        const errorMessage = 'No file uploaded. Please upload an image file.';
        return handleError(req, res, errorMessage, 400);
    }
    try{
        // if file upload is successful, send back relevant file information
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!', 
            file: req.file // returning the uploaded file information
        });
    }catch(err){
        // if an error occurs, log the error and send back an error response
        const errorMessage = `Unexpected error: ${(err as Error).message}`;
        return handleError(req, res, errorMessage, 500);
    }
    
};

// resizing an image 
// const resizeImage = 
















// export the uploadImage function
export { uploadImage };