import { Request, Response } from 'express';
import { logError } from '../middlewares/middlewareLogger'; // import error logging function to log errors

// Function to upload an image
const uploadImage = (req: Request, res: Response): any => {

    // checking if the file is existing in the request
    if (!req.file) {
        const errorMessage = 'No file uploaded. Please upload an image file.';
        logError(errorMessage); // logging the error message
        return res.status(400).json({ success: false, message: errorMessage }); // responding with a 400 Bad Request
    }
    try{
        // if file upload is successful, send back relevant file information
        return res.status(200).json({
            success: true, // success status
            message: 'File uploaded successfully!', // success message
            file: req.file // file uploaded information
        });
    }catch(err){
        // if an error occurs, log the error and send back an error response
        const errorMessage = "Unexpected error: ${(err as Error).message}";
        logError(errorMessage); // log the error message
        return res.status(500).json({ success: false, message: 'Internal server error' }); // respond with a 500 Internal
    }

};

// Export the uploadImage function
export { uploadImage };