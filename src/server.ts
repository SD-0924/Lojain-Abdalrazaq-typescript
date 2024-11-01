import express from 'express';
import { logger } from './middlewares/middlewareLogger';

const app = express();
const PORT = 3000;

// Middleware
app.use(logger); 

// Routes




// start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
