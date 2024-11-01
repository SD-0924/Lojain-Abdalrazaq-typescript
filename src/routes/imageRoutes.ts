// importing
import express from 'express';
import { upload } from '../middlewares/middlewareUpload'; 
import * as imageController from "../controllers/imageController";

// creating an express router
const router = express.Router();

// defining the routes
router.post(
    '/upload',
    upload.single('image'),
    imageController.uploadImage 
);

router.post(
    '/resize/:imageName',
    imageController.resizeImage 
);

router.post(
    '/crop/:imageName',
    imageController.cropImage
)

router.get(
    '/download/:imageName',
    imageController.downloadImage
)

router.post(
    '/filter/:imageName',
    imageController.filterImage
)

router.post(
    '/watermark/:imageName',
    imageController.watermarkImage
)

// exporting the router
export default router;