import request from 'supertest';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controllers/imageController';

const app = express();
const upload = multer();

// upload image endpoint
app.post('/api/upload', upload.single('image'), uploadImage);

describe('Upload Image Endpoint', () => {

    // Test case 1: Successfully upload an image
    it('should upload an image successfully', async () => {

        const imagePath = path.resolve(__dirname, 'images', 'test.jpg');
        
        const response = await request(app)
        .post('/api/upload')
        .attach('image', imagePath);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'File uploaded successfully!');
    });

    // Test case 2: Return an error if no image is attached
    it('should return an error if no image is uploaded', async () => {

        const response = await request(app)
            .post('/api/upload');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'No file uploaded. Please upload an image file.');
    });
});

