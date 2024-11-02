import request from 'supertest';
import express from 'express';
import { resizeImage } from '../controllers/imageController';

const app = express();
app.use(express.json());

// resize image endpoint
app.post('/api/resize/:imageName', resizeImage);

describe('Resize Image Endpoint', () => {

    // Case 1: Successful resizing of an existing image with valid dimensions
    it('should resize an image successfully with valid dimensions', async () => {
        const imageName = 'test.jpg'; // Image name in the uploads folder for testing
        const response = await request(app)
            .post(`/api/resize/${imageName}`)
            .send({ width: 200, height: 300 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Image resized successfully.');
        expect(response.body).toHaveProperty('resizedImagePath');
    });

    // Case 2: Failure due to missing width or height
    it('should return an error if width or height is missing', async () => {
        const response = await request(app)
            .post('/api/resize/test.jpg')
            .send({ "width": 200 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Please provide both width and height for resizing.');
    });

    // Case 3: Failure due to non-numeric width or height
    it('should return an error if width or height is not a number', async () => {
        const response = await request(app)
            .post('/api/resize/test.jpg')
            .send({ width: 'invalid', height: 300 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Width and height must be numbers.');
    });

    // Case 4: Failure due to invalid image name
    it('should return an error if image name is invalid', async () => {
        const response = await request(app)
            .post('/api/resize/invalid.jpg')
            .send({ width: 200, height: 300 });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'The specified image does not exist.');
    });
});