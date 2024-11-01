// importing
import express from 'express';
import { upload } from '../middlewares/middlewareUpload'; 
import * as imageController from "../controllers/imageController";

// creating an express router
const router = express.Router();

router.post(
    '/upload',
    upload.single('image'),
    imageController.uploadImage 
);


// exporting the router
export default router;