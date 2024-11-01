// importing necessary modules
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { logError } from './middlewareLogger';
import { AllowedImageTypes } from '../utils/enums';

// folder path to store the uploaded files
const folderPath = path.join(__dirname, '../../images/uploads');

// This file is to build the middleware for uploading files to the server using multer
const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, folderPath);
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// Updated fileFilter function to check if the file already exists
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    // the full path of the file to be uploaded
    const filePath = path.join(folderPath, file.originalname);

    // checking if the file exists in the upload directory
    if (fs.existsSync(filePath)) {
        logError(`File with the name ${file.originalname} already exists.`);
        cb(null, false); // reject the file if it exists
    } else if (Object.values(AllowedImageTypes).includes(file.mimetype as AllowedImageTypes)) {
        cb(null, true); // accept the file if it's an allowed type and doesn't exist
    } else {
        logError(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and GIF images are allowed.`);
        cb(null, false); // reject file for invalid type
    }

};

// setting the upload middleware
// the upload middleware takes an object with two properties: storage and fileFilter
// storage -> the storage engine to be used for storing the uploaded files
// fileFilter -> the filter function to be used for filtering the uploaded files
const upload = multer({ storage: storage, fileFilter: fileFilter });

// exporting the upload middleware for use in routes
export { upload };