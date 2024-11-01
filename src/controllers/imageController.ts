import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { handleError } from '../utils/errorHandler';
import { AllowedFilters } from '../utils/enums';

const uploadsFolderPath = path.join(__dirname, '../../images/uploads'); // Path to the uploads folder
const processedFolderPath = path.join(__dirname, '../../images/processed'); // Path to the prcessed folder

// upload an image
const uploadImage = (req: Request, res: Response): any => {

    // checking if the file is existing in the request
    if (!req.file) {
        const errorMessage = 'No file uploaded. Please upload an image file.';
        return handleError(req, res, errorMessage, 400);
    }
    try{
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!', 
            file: req.file // returning the uploaded file information
        });
    }catch(err){
        const errorMessage = `Unexpected error: ${(err as Error).message}`;
        return handleError(req, res, errorMessage, 500);
    }
    
};

// resizing an image 
const resizeImage = async (req: Request, res: Response): Promise<any> =>{
    try{

        const { imageName } = req.params;  
        const { width, height } = req.body;

        // validate the width and height values
        if (!width || !height) {
            return handleError(req, res, "Please provide both width and height for resizing.", 400);
        }

        const parsedWidth = parseInt(width, 10);
        const parsedHeight = parseInt(height, 10);

        // validate that width and height are numbers
        if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
            return handleError(req, res, "Width and height must be numbers.", 400);
        }

        const originalImagePath = path.join(uploadsFolderPath, imageName);

        if (!fs.existsSync(originalImagePath)) {
            return handleError(req, res, "The specified image does not exist.", 404);
        }

        const resizedImagePath = path.join(processedFolderPath, `${parsedWidth}x${parsedHeight}-${imageName}`);

        // resizing the image using sharp
        await sharp(originalImagePath)
            .resize(parsedWidth, parsedHeight)
            .toFile(resizedImagePath);

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

// cropping an image
const cropImage = async (req: Request, res: Response): Promise<any> =>{
    try{
        const { imageName } = req.params; 
        const { x, y, width, height } = req.body;

        // validate the x, y, width and height values
        if (!x || !y || !width || !height) {
            return handleError(req, res, "Please provide x, y, width and height for cropping.", 400);
        }

        const parsedX = parseInt(x, 10);
        const parsedY = parseInt(y, 10);
        const parsedWidth = parseInt(width, 10);
        const parsedHeight = parseInt(height, 10);

        if (isNaN(parsedX) || isNaN(parsedY) || isNaN(parsedWidth) || isNaN(parsedHeight)) {
            return handleError(req, res, "x, y, width and height must be numbers.", 400);
        }

        const originalImagePath = path.join(uploadsFolderPath, imageName);

        if (!fs.existsSync(originalImagePath)) {
            return handleError(req, res, "The specified image does not exist.", 404);
        }

        const croppedImagePath = path.join(processedFolderPath, `cropped-${parsedX}-${parsedY}-${parsedWidth}-${parsedHeight}-${imageName}`);

        // cropping the image using sharp
        await sharp(originalImagePath)
            .extract({ left: parsedX, top: parsedY, width: parsedWidth, height: parsedHeight })
            .toFile(croppedImagePath);

        res.status(200).json({
            success: true,
            message: "Image cropped successfully.",
            croppedImagePath: croppedImagePath
        });

    }catch(err){
        const errorMessage = `Error: ${(err as Error).message}`;
        return handleError(req, res, errorMessage, 500);
    }

};

// download an image
const downloadImage = (req: Request, res: Response): any =>{

    const { imageName } = req.params;
    const imagePath = path.join(processedFolderPath, imageName);

    // checking if the image exists to be downloaded
    if (fs.existsSync(imagePath)) {
        return res.download(imagePath, (err) => {
            // if an error occurs, log the error and send back an error response
            if (err) {
                return handleError(req, res, "Error downloading the image.", 500);
            }
        });
    }

    // if the processed image doesn't exist, send back an error response
    return handleError(req, res, "The specified processed image does not exist.", 404);
}

// filter image with blur and grayscale
const filterImage = async (req: Request, res: Response): Promise<any> =>{
    try{
        const { imageName } = req.params;
        const { filterType } = req.body;

        if (!filterType || typeof filterType !== 'string' || !Object.values(AllowedFilters).includes(filterType as AllowedFilters)) {
            return handleError(req, res, `Invalid filter type. Please choose one of the following: ${Object.values(AllowedFilters).join(', ')}.`, 400);
        }
        // searching for the image in the uploads folder
        const originalImagePath = path.join(uploadsFolderPath, imageName);
        if(!fs.existsSync(originalImagePath)){
            return handleError(req, res, "The specified image does not exist.", 404);
        }

        const outputImagePath = path.join(processedFolderPath, `filtered-${filterType}-${imageName}`);
        let sharpInstance = sharp(originalImagePath);

        // applying the filter based on the filter type
        if (filterType === 'grayscale') {
            sharpInstance = sharpInstance.grayscale();
        } else {
            sharpInstance = sharpInstance.blur(5);
        }

        await sharpInstance.toFile(outputImagePath);

        res.status(200).json({
            success: true,
            message: `Image filtered successfully with ${filterType}.`,
            filteredImagePath: outputImagePath
        });

    }catch(err){
        const errorMessage = `Error: ${(err as Error).message}`;
        return handleError(req, res, errorMessage, 500);
    }

};

// export the uploadImage function
export { 
    uploadImage, 
    resizeImage,
    cropImage,
    downloadImage, 
    filterImage
};