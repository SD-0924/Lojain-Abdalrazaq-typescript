import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { handleError } from '../utils/errorHandler';

// Path to the uploads folder
const folderPath = path.join(__dirname, '../../images/uploads');

// Path to the prcessed folder
const processedFolderPath = path.join(__dirname, '../../images/processed');

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
const resizeImage = async (req: Request, res: Response): Promise<any> =>{
    try{
        // taking the image name and the width and height from the request
        const { imageName } = req.params;  
        const { width, height } = req.body;

        // validate the width and height values
        if (!width || !height) {
            return handleError(req, res, "Please provide both width and height for resizing.", 400);
        }

        // parse the width and height
        const parsedWidth = parseInt(width, 10);
        const parsedHeight = parseInt(height, 10);

        // validate that width and height are numbers
        if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
            return handleError(req, res, "Width and height must be numbers.", 400);
        }

        const originalImagePath = path.join(__dirname, '../../images/uploads', imageName);

        if (!fs.existsSync(originalImagePath)) {
            return handleError(req, res, "The specified image does not exist.", 404);
        }

        // create a new path to the resized image
        const resizedImagePath = path.join(processedFolderPath, `${parsedWidth}x${parsedHeight}-${imageName}`);

        // resizing the imagae using sharp
        await sharp(originalImagePath).resize(parsedWidth, parsedHeight).toFile(resizedImagePath);

        // sending success response 
        res.status(200).json({
            success: true,
            message: "Image resized successfully.",
            resizedImagePath: resizedImagePath
        });

    }catch(err){
        // if an error occurs, log the error and send back an error response
        const errorMessage = `Error: ${(err as Error).message}`;
        return handleError(req, res, errorMessage, 500);
    }

};

// export the uploadImage function
export { 
    uploadImage, 
    resizeImage
};