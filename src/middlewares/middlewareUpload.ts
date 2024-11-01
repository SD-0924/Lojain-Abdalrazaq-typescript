// importing necessary modules
import multer from 'multer';
import path from 'path';
import { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { logError } from './middlewareLogger';
import { AllowedImageTypes } from '../utils/allowedImageTypes';

// This file is to build the middleware for uploading files to the server using multer
const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
        const folderPath = path.join(__dirname, '../../images/uploaded');
        cb(null, folderPath);
    },

    filename: (req, file, cb) =>{
        console.log("==== Middleware Upload ====");
        console.log(" Uploaded File name before renaming: "+ file.originalname);

        // generating a unique suffix for the file name using the current date and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // renaming the file to avoid duplicates since many users can upload files with the same name
        const newFileName = uniqueSuffix + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// fileFilter function to filter the uploaded files and accept only the allowed image types
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    // cheking if the uploaded file is an image with specific types defined in AllowedImageTypes enum
    if (Object.values(AllowedImageTypes).includes(file.mimetype as AllowedImageTypes)) {
        cb(null, true); // accept
    } else {
        logError(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and GIF images are allowed.`);
        cb(null, false); // reject
    }
};

// setting the upload middleware
// the upload middleware takes an object with two properties: storage and fileFilter
// storage -> the storage engine to be used for storing the uploaded files
// fileFilter -> the filter function to be used for filtering the uploaded files
const upload = multer({ storage: storage, fileFilter: fileFilter });

// exporting the upload middleware for use in routes
export { upload };