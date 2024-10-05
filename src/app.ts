import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import authRoutes from './routes/auth.route';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthenticationFilter from './middlewares/auth.middleware';
import { config } from './config/config';
import { User } from './models/user.model';
import GetAllData from './utils/fetch.all.data';
// Create an instance of AuthenticationFilter
const filter = new AuthenticationFilter();
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.route.ts'], // File where API routes are defined
};

// Generate documentation from options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

GetAllData.initialize();


// Serve Swagger documentation at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Basic route

app.get('/', async (req: Request, res: Response) => {
    try {
        // Créez un nouvel utilisateur

        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});



app.use('/api/v1', authRoutes);
app.use('/api/v1',productRoutes);

app.use(errorMiddleware);

// HTTPS server options
const httpsOptions: https.ServerOptions = {
  key: fs.readFileSync(path.resolve(__dirname, config.CERT_KEY || 'config/certificates/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, config.CERT_CERT ||'config/certificates/cert.pem')),
};

// Create and start the HTTPS server
const port = config.PORT;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

export default app;
