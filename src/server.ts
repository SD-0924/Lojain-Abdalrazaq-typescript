import express from 'express';
// importing the logger middleware
import { logger } from './middlewares/middlewareLogger';
// importing the image routes
import imageRoutes from './routes/imageRoutes';

// express aaplication
const app = express();
const PORT = 3000;

// Middlewares
app.use(logger); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api',imageRoutes);

// start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
