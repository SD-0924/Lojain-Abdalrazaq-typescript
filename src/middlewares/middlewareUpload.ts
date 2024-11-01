// importing the multer library
import multer from 'multer';
import { FileFilterCallback } from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { logError } from './middlewareLogger'; // Import your logging function

// setting the storage for the uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        // building the folder path using join method
        const folderPath = path.join(__dirname, '../../uploads/');
        cb(null, folderPath);
    },
    filename: (req, file, cb) =>{
        // file name before renaming
        console.log(file.originalname);
        // generating a unique suffix for the file name using the current date and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // renaming the file to avoid duplicates since many users can upload files with the same name
        const newFileName = uniqueSuffix + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

// setting the file filter to only allow images
// the fileFilter function takes three parameters: the request, the file, and a callback function
// req -> the request from the client 
// file -> the file to be uploaded
// cb -> the callback function to be called after the file is filtered
const fileFilter = (req:Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // accept the file and store it in the uploads folder
    } else {
        cb(null, false); // reject the file since it's not an image
        logError('Not an image! Please upload an image.');
    }
};

// setting the upload middleware
// the upload middleware takes an object with two properties: storage and fileFilter
// storage -> the storage engine to be used for storing the uploaded files
// fileFilter -> the filter function to be used for filtering the uploaded files
const upload = multer({ storage: storage, fileFilter: fileFilter });